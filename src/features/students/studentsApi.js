// Session 6 — Step 1: สร้าง RTK Query API Slice (slides 23–24)
import { createApi } from '@reduxjs/toolkit/query/react'

// In-memory database — ใช้แทน json-server เพื่อให้ deploy บน Vercel ได้
let students = [
  { id: '1', name: 'Alice Johnsonee', major: 'Computer Science', gpa: 3.8 },
  { id: '2', name: 'Anugul Sompoch',  major: 'Mathematics',       gpa: 3.1 },
  { id: '3', name: 'Carol White',     major: 'Physics',            gpa: 3.5 },
  { id: '4', name: 'David Brown',     major: 'Chemistry',          gpa: 2.4 },
  { id: '5', name: 'Eva Martinez',    major: 'Computer Science',   gpa: 3.9 },
  { id: '6', name: 'Frank Lee',       major: 'Biology',            gpa: 2.8 },
]
let nextId = 7

const mockBaseQuery = async (args) => {
  await new Promise((r) => setTimeout(r, 200))
  const url    = typeof args === 'string' ? args : args.url
  const method = typeof args === 'string' ? 'GET' : (args.method ?? 'GET')
  const body   = typeof args === 'string' ? undefined : args.body

  const idMatch = url.match(/^students\/(.+)$/)
  const id = idMatch?.[1]

  if (!id && method === 'GET')    return { data: [...students] }
  if (!id && method === 'POST') {
    const s = { ...body, id: String(nextId++) }
    students.push(s)
    return { data: s }
  }
  if (id && method === 'GET') {
    const s = students.find((s) => s.id === id)
    return s ? { data: s } : { error: { status: 404, data: 'Not found' } }
  }
  if (id && method === 'PUT') {
    students = students.map((s) => (s.id === id ? { ...s, ...body } : s))
    return { data: students.find((s) => s.id === id) }
  }
  if (id && method === 'DELETE') {
    students = students.filter((s) => s.id !== id)
    return { data: {} }
  }
  return { error: { status: 405, data: 'Method not allowed' } }
}

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: mockBaseQuery,
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    // ── QUERIES ──────────────────────────────────────────────────────
    getStudents: builder.query({
      query: () => 'students',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student', id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudentById: builder.query({
      query: (id) => `students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    // ── MUTATIONS ────────────────────────────────────────────────────
    addStudent: builder.mutation({
      query: (student) => ({ url: 'students', method: 'POST', body: student }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    updateStudent: builder.mutation({
      query: (student) => ({
        url: `students/${student.id}`,
        method: 'PUT',
        body: student,
      }),
      invalidatesTags: (result, error, student) => [
        { type: 'Student', id: student.id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({ url: `students/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi
