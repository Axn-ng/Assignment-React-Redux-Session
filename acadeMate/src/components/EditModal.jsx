// EditModal — referenced by StudentTable (slide 27)
import { useState } from 'react'

function EditModal({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name:      student.name,
    studentId: student.studentId,
    major:     student.major,
    gpa:       String(student.gpa),
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const gpaNum = parseFloat(formData.gpa)
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setErrors({ gpa: 'GPA must be between 0.0 and 4.0' })
      return
    }

    onSave({ ...student, ...formData, gpa: gpaNum })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Student ID</label>
            <input name="studentId" value={formData.studentId} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Major</label>
            <input name="major" value={formData.major} onChange={handleChange} />
          </div>
          <div className="field">
            <label>GPA</label>
            <input
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
              max="4"
            />
            {errors.gpa && <span className="error">{errors.gpa}</span>}
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn--primary">Save</button>
            <button type="button" className="btn btn--secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal
