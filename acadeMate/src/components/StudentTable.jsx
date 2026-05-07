import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteStudent, updateStudent } from '../features/students/studentsSlice'
import { selectAllStudents } from '../features/students/selectors'
import EditModal from './EditModal'

function StudentTable() {
  const dispatch    = useDispatch()
  const allStudents = useSelector(selectAllStudents)
  const [editing, setEditing] = useState(null)

  function handleDelete(id) {
    if (window.confirm('ยืนยันการลบนักศึกษา?')) {
      dispatch(deleteStudent(id))
    }
  }

  function handleEditSave(updated) {
    dispatch(updateStudent(updated))
    setEditing(null)
  }

  const tier = gpa => gpa >= 3.5 ? 'honour' : gpa >= 3.0 ? 'good' : 'fair'

  if (allStudents.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <div className="empty-dot-grid" />
          <p className="empty-text">ยังไม่มีรายการนักศึกษา</p>
          <p className="empty-sub">กรอกฟอร์มด้านบนเพื่อเพิ่มนักศึกษาคนแรก</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="section-label">
        รายชื่อนักศึกษา
        <span className="count-chip">{allStudents.length}</span>
      </div>
      <div className="table-card">
        <table className="student-table">
          <thead>
            <tr>
              <th>ชื่อ – นามสกุล</th>
              <th>รหัสนักศึกษา</th>
              <th>สาขาวิชา</th>
              <th>GPA</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((s, i) => (
              <tr key={s.id} style={{ animationDelay: `${i * 40}ms` }} className="tr-animate">
                <td className="td-name">{s.name}</td>
                <td><code>{s.studentId}</code></td>
                <td className="td-major">{s.major}</td>
                <td><span className={`gpa-badge ${tier(s.gpa)}`}>{s.gpa.toFixed(2)}</span></td>
                <td>
                  <div className="action-cell">
                    <button className="btn-edit"   onClick={() => setEditing(s)}>แก้ไข</button>
                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>ลบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal student={editing} onSave={handleEditSave} onCancel={() => setEditing(null)} />
      )}
    </>
  )
}

export default StudentTable
