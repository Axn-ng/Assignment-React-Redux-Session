import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllStudents,
  selectStudentsStatus,
  selectStudentsError,
} from '../features/students/selectors'
import {
  deleteStudentAsync,
  updateStudentAsync,
  fetchStudents,
} from '../features/students/studentsThunks'

function StudentTable() {
  const students = useSelector(selectAllStudents)
  const status = useSelector(selectStudentsStatus)
  const error = useSelector(selectStudentsError)
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(null)

  const handleDelete = (id) => {
    dispatch(deleteStudentAsync(id))
  }

  const handleEditSave = (e) => {
    e.preventDefault()
    dispatch(updateStudentAsync({ ...editing, gpa: parseFloat(editing.gpa) }))
    setEditing(null)
  }

  if (status === 'loading') {
    return <div className="spinner">Loading…</div>
  }

  if (status === 'failed') {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())}>Retry</button>
      </div>
    )
  }

  if (status !== 'succeeded') return null

  return (
    <div className="student-table-wrapper">
      <h2>Students</h2>
      {students.length === 0 ? (
        <p className="empty-msg">No students yet. Add one above.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              editing?.id === student.id ? (
                <tr key={student.id} className="editing-row">
                  <td>
                    <input
                      value={editing.name}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editing.studentId}
                      onChange={(e) =>
                        setEditing({ ...editing, studentId: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editing.major}
                      onChange={(e) =>
                        setEditing({ ...editing, major: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={editing.gpa}
                      onChange={(e) =>
                        setEditing({ ...editing, gpa: e.target.value })
                      }
                    />
                  </td>
                  <td className="action-cell">
                    <button className="btn-save" onClick={handleEditSave}>
                      Save
                    </button>
                    <button className="btn-cancel" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.studentId}</td>
                  <td>{student.major}</td>
                  <td>{Number(student.gpa).toFixed(2)}</td>
                  <td className="action-cell">
                    <button
                      className="btn-edit"
                      onClick={() => setEditing(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StudentTable
