// Step 2 — Derived selectors อ่านจาก RTK Query cache (slide 25)
import { createSelector } from '@reduxjs/toolkit'
import { studentsApi } from './studentsApi'

const selectStudentsResult = studentsApi.endpoints.getStudents.select()

const selectStudentsData = createSelector(
  selectStudentsResult,
  (result) => result.data ?? []
)

export const selectAverageGpa = createSelector(selectStudentsData, (students) => {
  if (students.length === 0) return '—'
  return (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2)
})

export const selectStudentCount = createSelector(
  selectStudentsData,
  (students) => students.length
)

export const selectMaxGPA = createSelector(selectStudentsData, (students) => {
  if (students.length === 0) return 0
  return Math.max(...students.map((s) => s.gpa)).toFixed(2)
})

export const selectMinGPA = createSelector(selectStudentsData, (students) => {
  if (students.length === 0) return 0
  return Math.min(...students.map((s) => s.gpa)).toFixed(2)
})

export const selectHighAchievers = createSelector(selectStudentsData, (students) =>
  students.filter((s) => s.gpa >= 3.5)
)

export const selectGpaDistribution = createSelector(selectStudentsData, (students) => ({
  high:   students.filter((s) => s.gpa >= 3.5).length,
  medium: students.filter((s) => s.gpa >= 2.5 && s.gpa < 3.5).length,
  low:    students.filter((s) => s.gpa < 2.5).length,
}))
