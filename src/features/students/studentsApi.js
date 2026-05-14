import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE = 'http://localhost:3001/'

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  // ── Global refetch flags (ต้องมี setupListeners ใน store.js) ──
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Student'],
  endpoints: builder => ({

    // ── GET /students ──────────────────────────────────────────
    getStudents: builder.query({
      query: () => 'students',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student', id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),

    // ── GET /students/:id ──────────────────────────────────────
    getStudentById: builder.query({
      query: id => `students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),

    // ── POST /students ─────────────────────────────────────────
    addStudent: builder.mutation({
      query: newStudent => ({
        url: 'students',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    // ── PUT /students/:id — LAB STEP 1: Optimistic Update ──────
    updateStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: patch,
      }),

      // onQueryStarted ทำงานทันทีเมื่อ mutation ถูกเรียก ก่อนเซิร์ฟเวอร์ตอบสนอง
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // ── Patch the list cache immediately ──────────────────
        const patchList = dispatch(
          studentsApi.util.updateQueryData(
            'getStudents',
            undefined,
            draft => {
              const item = draft.find(s => s.id === id)
              if (item) Object.assign(item, patch)
            }
          )
        )

        // ── Patch the single-student detail cache ─────────────
        const patchDetail = dispatch(
          studentsApi.util.updateQueryData(
            'getStudentById',
            id,
            draft => {
              Object.assign(draft, patch)
            }
          )
        )

        // ── Wait for server — undo both patches on failure ────
        try {
          await queryFulfilled
          // Server confirmed → cache already shows correct data
        } catch {
          // Server rejected → revert both patches atomically
          patchList.undo()
          patchDetail.undo()
        }
      },

      invalidatesTags: (result, error, { id }) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),

    // ── DELETE /students/:id ───────────────────────────────────
    deleteStudent: builder.mutation({
      query: id => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
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
