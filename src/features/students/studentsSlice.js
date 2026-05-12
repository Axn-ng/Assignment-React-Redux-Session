// Session 5 — createEntityAdapter: normalized state { ids[], entities{} }
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from './studentsThunks';

// 1. สร้าง adapter — sortComparer จัดเรียง ids[] ตามชื่อเสมอ
const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// 2. getInitialState() สร้าง { ids:[], entities:{} } และ merge field พิเศษเพิ่ม
const initialState = studentsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch all
      .addCase(fetchStudents.pending, state => { state.status = 'loading'; })
      .addCase(fetchStudents.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        studentsAdapter.setAll(state, payload);
      })
      .addCase(fetchStudents.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Add one
      .addCase(addStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.addOne(state, payload);
      })
      // Update one — upsertOne: insert ถ้าไม่มี, update ถ้ามีแล้ว
      .addCase(updateStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.upsertOne(state, payload);
      })
      // Delete one — payload คือ id
      .addCase(deleteStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.removeOne(state, payload);
      });
  },
});

// 3. Export entity selectors — bind กับ state.students
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors(state => state.students);

export default studentsSlice.reducer;
