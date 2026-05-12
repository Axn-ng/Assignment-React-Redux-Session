// Step 4 — แทนที่ useSelector + useEffect ด้วย useGetStudentsQuery (slides 27–29)
import { useState } from 'react'
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from '../features/students/studentsApi'
import StudentRow from './StudentRow'
import EditModal from './EditModal'

function StudentTable() {
  const {
    data: students = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetStudentsQuery()

  const [deleteStudent] = useDeleteStudentMutation()
  const [updateStudent] = useUpdateStudentMutation()
  const [editing, setEditing] = useState(null)

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await deleteStudent(id)
    }
  }

  const handleEditSave = async (student) => {
    await updateStudent({ ...student, gpa: parseFloat(student.gpa) || 0 })
    setEditing(null)
  }

  if (isLoading) return <div className="spinner">Loading…</div>

  if (isError) return (
    <div className="error-banner">
      <p>Error: {error?.status || 'Failed to fetch students'}</p>
      <button onClick={refetch}>Retry</button>
    </div>
  )

  if (!students || students.length === 0) {
    return <p>No students found. Add one to the list.</p>
  }

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow
              key={student.id}
              student={student}
              index={index}
              setEditing={setEditing}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  )
}

export default StudentTable
