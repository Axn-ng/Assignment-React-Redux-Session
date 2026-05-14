import { useState, useEffect } from 'react'

function StudentRow({ student, isEditing, onEdit, onDelete, onSave, onCancel }) {
  const [form, setForm] = useState({ name: student.name, major: student.major, gpa: String(student.gpa) })

  useEffect(() => {
    if (isEditing) setForm({ name: student.name, major: student.major, gpa: String(student.gpa) })
  }, [isEditing, student])

  const gpaClass =
    student.gpa >= 3.5 ? 'gpa--high' :
    student.gpa >= 2.5 ? 'gpa--medium' : 'gpa--low'

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  if (isEditing) {
    return (
      <tr className="row--editing">
        <td><input className="inline-input" name="name" value={form.name} onChange={handleChange} /></td>
        <td><input className="inline-input" name="major" value={form.major} onChange={handleChange} /></td>
        <td>
          <input
            className="inline-input inline-input--gpa"
            name="gpa"
            type="number"
            step="0.1"
            min="0"
            max="4"
            value={form.gpa}
            onChange={handleChange}
          />
        </td>
        <td>
          <button
            className="btn btn--save"
            onClick={() => onSave({ ...student, name: form.name.trim(), major: form.major.trim(), gpa: parseFloat(form.gpa) || 0 })}
          >
            บันทึก
          </button>
          <button className="btn btn--secondary" onClick={onCancel}>ยกเลิก</button>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.major}</td>
      <td className={gpaClass}>{student.gpa.toFixed(1)}</td>
      <td>
        <button className="btn btn--edit" onClick={() => onEdit(student.id)}>แก้ไข</button>
        <button className="btn btn--delete" onClick={() => onDelete(student.id)}>ลบ</button>
      </td>
    </tr>
  )
}

export default StudentRow
