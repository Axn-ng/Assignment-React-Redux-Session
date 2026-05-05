import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCourses, getCourseById } from '../services/courseService'

export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCourses()
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCourseById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedCourse(state) {
      state.selectedCourse = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedCourse = action.payload
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearSelectedCourse } = courseSlice.actions
export default courseSlice.reducer
