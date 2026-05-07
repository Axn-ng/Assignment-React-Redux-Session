import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './courseSlice'
import studentsReducer from '../features/students/studentsSlice'

const store = configureStore({
  reducer: {
    courses: courseReducer,
    students: studentsReducer,
  },
})

export default store
