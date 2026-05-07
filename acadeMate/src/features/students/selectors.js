// src/features/students/selectors.js

// ── Basic selectors ───────────────────────────────────────
export const selectAllStudents = (state) => state.students.list

export const selectStudentCount = (state) => state.students.list.length

// ── Derived / computed selectors ─────────────────────────
export const selectAverageGpa = (state) => {
  const list = state.students.list
  if (list.length === 0) return '0.00'
  const total = list.reduce((sum, s) => sum + s.gpa, 0)
  return (total / list.length).toFixed(2)
}

// selector factory — returns a function (useful for edit modal)
export const selectStudentById = (id) => (state) =>
  state.students.list.find((s) => s.id === id)

export const selectHighAchievers = (state) =>
  state.students.list.filter((s) => s.gpa >= 3.5)
