import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/'

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Student'],
  endpoints: builder => ({

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

    addStudent: builder.mutation({
      query: newStudent => ({
        url: 'students',
        method: 'POST',
        body: newStudent,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    updateStudent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `students/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          studentsApi.util.updateQueryData('getStudents', undefined, draft => {
            const item = draft.find(s => s.id === id)
            if (item) Object.assign(item, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchList.undo()
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),

    deleteStudent: builder.mutation({
      query: id => ({ url: `students/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi
