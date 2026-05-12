// Step 7 — แทนที่ dispatch(addStudentAsync()) ด้วย useAddStudentMutation (slides 32–33)
import { useState } from 'react'
import { useAddStudentMutation } from '../features/students/studentsApi'

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' }

function AddStudentForm() {
  const [addStudent] = useAddStudentMutation()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name.trim())     newErrors.name     = 'Name is required'
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!formData.major.trim())    newErrors.major    = 'Major is required'
    if (formData.gpa === '')       newErrors.gpa      = 'GPA is required'

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    const gpaNum = parseFloat(formData.gpa)
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setErrors((prev) => ({ ...prev, gpa: 'GPA must be between 0.0 and 4.0' }))
      return
    }

    addStudent({ ...formData, gpa: gpaNum })
    setFormData(EMPTY_FORM)
    setErrors({})
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <div className="field">
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="field">
        <label>Student ID</label>
        <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g. STU007" />
        {errors.studentId && <span className="error">{errors.studentId}</span>}
      </div>

      <div className="field">
        <label>Major</label>
        <input name="major" value={formData.major} onChange={handleChange} placeholder="e.g. Computer Science" />
        {errors.major && <span className="error">{errors.major}</span>}
      </div>

      <div className="field">
        <label>GPA</label>
        <input
          name="gpa"
          value={formData.gpa}
          onChange={handleChange}
          placeholder="0.0 – 4.0"
          type="number"
          step="0.1"
          min="0"
          max="4"
        />
        {errors.gpa && <span className="error">{errors.gpa}</span>}
      </div>

      <button type="submit" className="btn btn--primary">Add Student</button>
    </form>
  )
}

export default AddStudentForm
