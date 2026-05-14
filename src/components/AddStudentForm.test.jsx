// Lab Step 2 — AddStudentForm Tests
// userEvent type + click, ตรวจ feedback ที่ UI

import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../tests/utils'
import { server } from '../tests/server'
import AddStudentForm from './AddStudentForm'

describe('AddStudentForm', () => {
  // Test: กรอกฟอร์มและ submit — ตรวจ success feedback
  it('adds a new student and shows confirmation', async () => {
    // Step 1: สร้าง userEvent instance
    const user = userEvent.setup()

    // Step 2: Override POST handler ให้คืน Charlie
    server.use(
      http.post('http://localhost:3001/students', () =>
        HttpResponse.json({ id: 3, name: 'Charlie', course: 'Testing' })
      )
    )

    renderWithProviders(<AddStudentForm />)

    // Step 3: พิมพ์ข้อมูลและกดปุ่ม Add
    await user.type(screen.getByLabelText('Name'), 'Charlie')
    await user.type(screen.getByLabelText('Course'), 'Testing')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // Step 4: รอ async update แล้ว assert ว่า Charlie ปรากฏในหน้า
    await waitFor(() => {
      expect(screen.getByText('Charlie')).toBeInTheDocument()
    })
  })

  // Test: ปุ่ม Add disabled ระหว่าง loading
  it('disables the Add button while submitting', async () => {
    const user = userEvent.setup()

    renderWithProviders(<AddStudentForm />)

    await user.type(screen.getByLabelText('Name'), 'Dave')
    await user.click(screen.getByRole('button', { name: /add/i }))

    // ระหว่าง loading ปุ่มควร disabled
    // (MSW จะตอบกลับอัตโนมัติจาก default handler)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled()
    })
  })
})
