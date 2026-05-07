import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './courseSlice'
import studentsReducer from '../features/students/studentsSlice'
import gradesReducer from '../features/grades/gradesSlice'

const STORAGE_KEY = 'acadeMate_students'

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

function saveStudents(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch { /* quota exceeded or private browsing */ }
}

const savedList = loadStudents()

const store = configureStore({
  reducer: {
    courses:  courseReducer,
    students: studentsReducer,
    grades:   gradesReducer,
  },
  preloadedState: savedList
    ? { students: { list: savedList, status: 'idle', error: null } }
    : undefined,
})

// Persist only the student list — courses come from API, grades are session-only
store.subscribe(() => saveStudents(store.getState().students.list))

export default store
