import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addStudent } from '../features/students/studentsSlice'

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' }

function Field({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={type === 'number' ? '0.01' : undefined}
        min={type === 'number' ? '0' : undefined}
        max={type === 'number' ? '4' : undefined}
        autoComplete="off"
      />
    </div>
  )
}

function AddStudentForm() {
  const dispatch = useDispatch()
  const [form, setForm]   = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

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
    dispatch(addStudent({ id: Date.now(), ...form, gpa }))
    setForm(EMPTY_FORM)
    setError('')
  }

  return (
    <div className="form-card">
      <div className="form-card-header">
        <span className="form-card-title">เพิ่มนักศึกษาใหม่</span>
        <span className="form-card-sub">กรอกข้อมูลแล้วกดเพิ่ม</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="ชื่อ – นามสกุล" name="name"      value={form.name}      onChange={handleChange} placeholder="Somchai Rakpong" />
          <Field label="รหัสนักศึกษา"   name="studentId" value={form.studentId} onChange={handleChange} placeholder="6501006" />
          <Field label="สาขาวิชา"       name="major"     value={form.major}     onChange={handleChange} placeholder="Computer Science" />
          <Field label="GPA"            name="gpa"       value={form.gpa}       onChange={handleChange} type="number" placeholder="0.00 – 4.00" />
        </div>
        <button className="btn-primary" type="submit">เพิ่มนักศึกษา</button>
      </form>
    </div>
  )
}

export default AddStudentForm
