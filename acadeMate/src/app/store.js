// Step 3 — เพิ่ม studentsApi reducer + middleware (slide 26)
import { configureStore } from '@reduxjs/toolkit'
import { studentsApi } from '../features/students/studentsApi'

const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(studentsApi.middleware),
})

export default store
