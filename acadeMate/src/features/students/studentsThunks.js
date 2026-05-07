import { createAsyncThunk } from '@reduxjs/toolkit'

const RESOURCE = 'https://69fc155efce564e259174422.mockapi.io/Students'

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(RESOURCE)
      if (!res.ok) return rejectWithValue(`Fetch failed (${res.status})`)
      return res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addStudentAsync = createAsyncThunk(
  'students/addOne',
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await fetch(RESOURCE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      })
      if (!res.ok) return rejectWithValue(`Add failed (${res.status})`)
      return res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateStudentAsync = createAsyncThunk(
  'students/updateOne',
  async ({ id, ...changes }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${RESOURCE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      if (!res.ok) return rejectWithValue(`Update failed (${res.status})`)
      return res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${RESOURCE}/${id}`, { method: 'DELETE' })
      if (!res.ok) return rejectWithValue(`Delete failed (${res.status})`)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
