import { useState } from 'react'

function EditModal({ student, onSave, onCancel }) {
  const [form, setForm]   = useState({
    name:      student.name,
    studentId: student.studentId,
    major:     student.major,
    gpa:       String(student.gpa),
  })
  const [error, setError] = useState('')

  const onChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.studentId.trim() || !form.major.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    const gpa = parseFloat(form.gpa)
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      setError('GPA ต้องอยู่ระหว่าง 0.00 – 4.00')
      return
    }
    // Pass id from original student, parsed gpa from form
    onSave({ id: student.id, name: form.name.trim(), studentId: form.studentId.trim(), major: form.major.trim(), gpa })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">แก้ไขข้อมูลนักศึกษา</span>
          <button className="modal-close" onClick={onCancel} aria-label="close">&#x2715;</button>
        </div>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">ชื่อ – นามสกุล</label>
              <input className="form-input" name="name" value={form.name} onChange={onChange} />
            </div>
            <div className="form-field">
              <label className="form-label">รหัสนักศึกษา</label>
              <input className="form-input" name="studentId" value={form.studentId} onChange={onChange} />
            </div>
            <div className="form-field">
              <label className="form-label">สาขาวิชา</label>
              <input className="form-input" name="major" value={form.major} onChange={onChange} />
            </div>
            <div className="form-field">
              <label className="form-label">GPA</label>
              <input className="form-input" name="gpa" value={form.gpa} onChange={onChange}
                type="number" step="0.01" min="0" max="4" />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" type="button" onClick={onCancel}>ยกเลิก</button>
            <button className="btn-primary" type="submit">บันทึกการเปลี่ยนแปลง</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
