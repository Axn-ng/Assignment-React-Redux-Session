import { http, HttpResponse } from 'msw'

const BASE = 'http://localhost:3001'

export const studentHandlers = [
  http.get(`${BASE}/students`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice', major: 'CS', year: 3, gpa: 3.8 },
      { id: 2, name: 'Bob', major: 'Math', year: 2, gpa: 3.2 },
    ])
  }),

  http.post(`${BASE}/students`, async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: Date.now(), ...body }, { status: 201 })
  }),

  http.put(`${BASE}/students/:id`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json({ id: Number(params.id), ...body })
  }),

  http.delete(`${BASE}/students/:id`, ({ params }) => {
    return HttpResponse.json({ id: Number(params.id) })
  }),
]
