import { createSlice } from '@reduxjs/toolkit'

const gradesSlice = createSlice({
  name: 'grades',
  initialState: { list: [] },
  reducers: {
    addGrade: (state, action) => {
      state.list.push({ id: Date.now(), ...action.payload })
    },
    updateGrade: (state, action) => {
      const idx = state.list.findIndex(g => g.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
    deleteGrade: (state, action) => {
      state.list = state.list.filter(g => g.id !== action.payload)
    },
  },
})

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions
export default gradesSlice.reducer
