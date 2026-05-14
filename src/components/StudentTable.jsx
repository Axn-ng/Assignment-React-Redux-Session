import { useState } from 'react'
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from '../features/students/studentsApi'
import StudentRow from './StudentRow'

function StudentTable() {
  const { data: students = [], isLoading, isError, error, refetch } = useGetStudentsQuery()
  const [deleteStudent] = useDeleteStudentMutation()
  const [updateStudent] = useUpdateStudentMutation()
  const [editingId, setEditingId] = useState(null)
  const [log, setLog] = useState([])

  const handleDelete = async (id) => {
    if (window.confirm('ต้องการลบนักศึกษาคนนี้?')) {
      await deleteStudent(id)
    }
  }

  const handleSave = async (updated) => {
    const before = students.find(s => s.id === updated.id)
    await updateStudent(updated)

    const changes = []
    if (before.name !== updated.name)   changes.push(`ชื่อ: "${before.name}" → "${updated.name}"`)
    if (before.major !== updated.major) changes.push(`สาขา: "${before.major}" → "${updated.major}"`)
    if (before.gpa !== updated.gpa)     changes.push(`GPA: ${before.gpa.toFixed(1)} → ${updated.gpa.toFixed(1)}`)

    const entry = { time: new Date().toLocaleTimeString('th-TH'), name: updated.name, changes }
    console.log('[AcadeMate] Edit saved:', entry)
    setLog(prev => [entry, ...prev])
    setEditingId(null)
  }

  if (isLoading) return <div className="spinner">กำลังโหลดข้อมูล…</div>
  if (isError) return (
    <div className="error-banner">
      <p>เกิดข้อผิดพลาด: {error?.status || 'ไม่สามารถโหลดข้อมูลได้'}</p>
      <button onClick={refetch}>ลองใหม่</button>
    </div>
  )
  if (!students.length) return <p className="empty">ยังไม่มีข้อมูลนักศึกษา</p>

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>สาขา</th>
            <th>GPA</th>
            <th>การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <StudentRow
              key={student.id}
              student={student}
              isEditing={editingId === student.id}
              onEdit={setEditingId}
              onDelete={handleDelete}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
            />
          ))}
        </tbody>
      </table>

      {log.length > 0 && (
        <div className="edit-log">
          <h3>ประวัติการแก้ไข</h3>
          <ul>
            {log.map((entry, i) => (
              <li key={i} className="log-entry">
                <span className="log-time">{entry.time}</span>
                <span className="log-name">{entry.name}</span>
                <span className="log-changes">
                  {entry.changes.length > 0
                    ? entry.changes.join(' · ')
                    : 'ไม่มีการเปลี่ยนแปลง'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default StudentTable
