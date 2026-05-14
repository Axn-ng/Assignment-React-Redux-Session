import { useState } from 'react'
import { useAddStudentMutation } from '../features/students/studentsApi'

const emptyForm = { name: '', major: '', gpa: '' }

function StudentForm() {
  const [addStudent, { isLoading }] = useAddStudentMutation()
  const [form, setForm]   = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'กรุณากรอกชื่อ'
    if (!form.major.trim()) e.major = 'กรุณากรอกสาขา'
    const g = parseFloat(form.gpa)
    if (isNaN(g) || g < 0 || g > 4) e.gpa = 'GPA ต้องอยู่ระหว่าง 0.0 – 4.0'
    return e
  }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    try {
      await addStudent({ name: form.name.trim(), major: form.major.trim(), gpa: parseFloat(form.gpa) }).unwrap()
      setForm(emptyForm)
      setErrors({})
    } catch (err) {
      console.error('เพิ่มนักศึกษาล้มเหลว:', err)
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>เพิ่มนักศึกษาใหม่</h2>

      <div className="field">
        <label>ชื่อ-สกุล</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="เช่น สมชาย ใจดี" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <label>สาขา</label>
        <input name="major" value={form.major} onChange={handleChange} placeholder="เช่น Computer Science" />
        {errors.major && <span className="error">{errors.major}</span>}
      </div>

      <div className="field">
        <label>GPA</label>
        <input
          name="gpa"
          value={form.gpa}
          onChange={handleChange}
          placeholder="0.0 – 4.0"
          type="number"
          step="0.1"
          min="0"
          max="4"
        />
        {errors.gpa && <span className="error">{errors.gpa}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={isLoading}>
          {isLoading ? 'กำลังบันทึก…' : 'เพิ่มนักศึกษา'}
        </button>
      </div>
    </form>
  )
}

export default StudentForm
