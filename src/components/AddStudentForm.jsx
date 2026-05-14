import { useState } from 'react'
import { useAddStudentMutation } from '../features/students/studentsApi'

const s = {
  section: { background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,.1)', padding: '1.25rem', marginBottom: '1.5rem' },
  form: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' },
  group: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 12, color: '#555' },
  input: { padding: '6px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14 },
  btn: { padding: '7px 16px', borderRadius: 6, border: 'none', background: '#27ae60', color: '#fff', cursor: 'pointer', fontWeight: 600 },
  success: { marginTop: 10, color: '#27ae60', fontWeight: 600 },
}

const EMPTY = { name: '', course: '', year: 1, gpa: 3.0 }

function AddStudentForm() {
  const [form, setForm] = useState(EMPTY)
  const [addStudent, { isLoading, data: addedStudent }] = useAddStudentMutation()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'gpa' ? Number(value) : value,
    }))
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
          <label htmlFor="name" style={s.label}>Name</label>
          <input
            id="name"
            name="name"
            style={{ ...s.input, width: 180 }}
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
          />
        </div>
        <div style={s.group}>
          <label htmlFor="course" style={s.label}>Course</label>
          <input
            id="course"
            name="course"
            style={{ ...s.input, width: 200 }}
            value={form.course}
            onChange={handleChange}
            placeholder="Course / Major"
          />
        </div>
        <div style={s.group}>
          <label htmlFor="year" style={s.label}>Year</label>
          <input
            id="year"
            name="year"
            style={{ ...s.input, width: 60 }}
            value={form.year}
            onChange={handleChange}
            type="number"
            min={1}
            max={6}
          />
        </div>
        <div style={s.group}>
          <label htmlFor="gpa" style={s.label}>GPA</label>
          <input
            id="gpa"
            name="gpa"
            style={{ ...s.input, width: 70 }}
            value={form.gpa}
            onChange={handleChange}
            type="number"
            step="0.01"
            min={0}
            max={4}
          />
        </div>
        <button style={s.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Adding…' : 'Add'}
        </button>
      </form>

      {addedStudent && (
        <p style={s.success}>{addedStudent.name}</p>
      )}
    </div>
  )
}

export default AddStudentForm
