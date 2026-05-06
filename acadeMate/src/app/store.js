import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './courseSlice'
import studentsReducer from '../features/students/studentsSlice'
import gradesReducer from '../features/grades/gradesSlice'

const store = configureStore({
  reducer: {
    courses: courseReducer,
    students: studentsReducer,
    grades: gradesReducer,
  },
})

export default store
