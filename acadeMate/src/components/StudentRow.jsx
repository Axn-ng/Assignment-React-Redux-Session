// Step 5 — รับ student object โดยตรง ไม่ต้องใช้ useSelector (slide 30)
function StudentRow({ student, index, setEditing, handleDelete }) {
  if (!student) return null

  return (
    <tr className={student.gpa >= 3.5 ? 'high-gpa' : ''}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{student.gpa.toFixed(2)}</td>
      <td>
        <button type="button" className="btn btn--edit" onClick={() => setEditing(student)}>Edit</button>
        <button type="button" className="btn btn--delete" onClick={() => handleDelete(student.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default StudentRow
