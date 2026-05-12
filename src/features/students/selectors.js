// Session 5 — Memoized derived selectors ด้วย createSelector
import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from './studentsSlice';

// ── Primitive selectors (return scalars — no memoization needed)
export const selectStudentsStatus = state => state.students.status;
export const selectStudentsError  = state => state.students.error;

// ── Derived selectors (memoized — คำนวณจาก list)
// Result function รันซ้ำเฉพาะเมื่อ selectAllStudents คืน reference ใหม่

export const selectAverageGpa = createSelector(
  selectAllStudents,
  students => {
    if (!students.length) return '—';
    const sum = students.reduce((acc, s) => acc + s.gpa, 0);
    return (sum / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectAllStudents,
  students => students.filter(s => s.gpa >= 3.5)
);

export const selectGpaDistribution = createSelector(
  selectAllStudents,
  students => ({
    high:   students.filter(s => s.gpa >= 3.5).length,
    medium: students.filter(s => s.gpa >= 2.5 && s.gpa < 3.5).length,
    low:    students.filter(s => s.gpa < 2.5).length,
  })
);
