// Lab Step 1 — StudentTable Tests
// 3 cases: loading, success data, API error (403)

import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../tests/utils'
import { server } from '../tests/server'
import StudentTable from './StudentTable'

const mockStudents = [
  { id: 1, name: 'Alice', major: 'CS', year: 3, gpa: 3.8 },
  { id: 2, name: 'Bob', major: 'Math', year: 2, gpa: 3.2 },
]

describe('StudentTable', () => {
  // Test 1: ตรวจสอบ Loading state
  it('shows loading state initially', () => {
    renderWithProviders(<StudentTable />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // Test 2: ตรวจสอบข้อมูลนักเรียนหลัง MSW ตอบกลับ
  it('renders student rows after data loads', async () => {
    renderWithProviders(<StudentTable />)
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
      expect(screen.getByText('3.80')).toBeInTheDocument()
    })
  })

  // Test 3: ตรวจสอบ Error state เมื่อ API คืน 403
  it('shows error message on 403 response', async () => {
    server.use(
      http.get('http://localhost:3001/students', () =>
        HttpResponse.json({ error: 'Forbidden' }, { status: 403 })
      )
    )
    renderWithProviders(<StudentTable />)
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
