import { createAsyncThunk } from '@reduxjs/toolkit';

// Mock database (จำลอง API)
let mockDb = [
  { id: '1', name: 'Alice Johnson',   gpa: 3.8, major: 'Computer Science' },
  { id: '2', name: 'Bob Smith',        gpa: 3.1, major: 'Mathematics' },
  { id: '3', name: 'Carol White',      gpa: 3.5, major: 'Physics' },
  { id: '4', name: 'David Brown',      gpa: 2.4, major: 'Chemistry' },
  { id: '5', name: 'Eva Martinez',     gpa: 3.9, major: 'Computer Science' },
  { id: '6', name: 'Frank Lee',        gpa: 2.8, major: 'Biology' },
];

let nextId = 7;

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await delay(400);
      return [...mockDb];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addOne',
  async (student, { rejectWithValue }) => {
    try {
      await delay(300);
      const newStudent = { ...student, id: String(nextId++) };
      mockDb.push(newStudent);
      return newStudent;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateOne',
  async (student, { rejectWithValue }) => {
    try {
      await delay(300);
      mockDb = mockDb.map(s => s.id === student.id ? { ...s, ...student } : s);
      return student;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      await delay(300);
      mockDb = mockDb.filter(s => s.id !== id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
