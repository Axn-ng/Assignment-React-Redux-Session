import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addStudentAsync } from '../features/students/studentsThunks'

const EMPTY = { name: '', studentId: '', major: '', gpa: '' }

function AddStudentForm() {
  const dispatch = useDispatch()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await dispatch(
        addStudentAsync({ ...form, gpa: parseFloat(form.gpa) })
      ).unwrap()
      setForm(EMPTY)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <form className="add-student-form" onSubmit={onSubmit}>
      <h2>Add Student</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="form-row">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          required
        />
        <input
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
          required
        />
        <input
          name="gpa"
          placeholder="GPA (0.0 – 4.0)"
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={form.gpa}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddStudentForm
