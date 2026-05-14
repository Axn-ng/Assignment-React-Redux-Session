import { useState } from 'react'
import { useAddStudentMutation } from './studentsApi'

const s = {
  section: { background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,.1)', padding: '1.25rem', marginBottom: '1.5rem' },
  form: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' },
  group: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 12, color: '#555' },
  input: { padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14 },
  btn: { padding: '7px 16px', borderRadius: 6, border: 'none', background: '#27ae60', color: '#fff', cursor: 'pointer', fontWeight: 600 },
}

const EMPTY = { name: '', major: '', year: 1, gpa: 3.0 }

function AddStudentForm() {
  const [form, setForm] = useState(EMPTY)
  const [addStudent, { isLoading }] = useAddStudentMutation()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'year' || name === 'gpa' ? Number(value) : value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim()) return
    await addStudent(form)
    setForm(EMPTY)
  }

  return (
    <div style={s.section}>
      <strong style={{ display: 'block', marginBottom: 10 }}>เพิ่มนักศึกษา</strong>
      <form style={s.form} onSubmit={handleSubmit}>
        <div style={s.group}>
          <label style={s.label}>ชื่อ</label>
          <input style={{ ...s.input, width: 180 }} name="name" value={form.name} onChange={handleChange} placeholder="ชื่อ-นามสกุล" />
        </div>
        <div style={s.group}>
          <label style={s.label}>สาขา</label>
          <input style={{ ...s.input, width: 200 }} name="major" value={form.major} onChange={handleChange} placeholder="สาขาวิชา" />
        </div>
        <div style={s.group}>
          <label style={s.label}>ปีการศึกษา</label>
          <input style={{ ...s.input, width: 60 }} name="year" value={form.year} onChange={handleChange} type="number" min={1} max={6} />
        </div>
        <div style={s.group}>
          <label style={s.label}>GPA</label>
          <input style={{ ...s.input, width: 70 }} name="gpa" value={form.gpa} onChange={handleChange} type="number" step="0.01" min={0} max={4} />
        </div>
        <button style={s.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Adding…' : '+ เพิ่ม'}
        </button>
      </form>
    </div>
  )
}

export default AddStudentForm
