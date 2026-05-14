// Session 6 — Step 1: สร้าง RTK Query API Slice (slides 23–24)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
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
