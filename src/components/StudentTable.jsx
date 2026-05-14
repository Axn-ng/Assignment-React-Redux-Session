import { useState } from 'react'
import {
  useGetStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from '../features/students/studentsApi'

const s = {
  section: { background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,.1)', padding: '1.25rem', marginBottom: '1.5rem' },
  toolbar: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  badge: { fontSize: 12, color: '#3A5BA0', background: '#e8ecf8', padding: '3px 8px', borderRadius: 12 },
  btn: { padding: '5px 12px', borderRadius: 6, cursor: 'pointer', border: '1px solid #ccc', background: '#f5f5f5' },
  btnPrimary: { padding: '5px 12px', borderRadius: 6, cursor: 'pointer', border: 'none', background: '#1e2a6e', color: '#fff' },
  btnDanger: { padding: '5px 12px', borderRadius: 6, cursor: 'pointer', border: 'none', background: '#c0392b', color: '#fff' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14 },
  th: { background: '#1e2a6e', color: '#fff', padding: '10px 14px', textAlign: 'left' },
  td: { padding: '9px 14px', borderBottom: '1px solid #eee' },
  input: { padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' },
  error: { color: '#c0392b', padding: '1rem', fontWeight: 600 },
}

function StudentTable() {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const {
    data: students = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetStudentsQuery()

  const [updateStudent] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()

  const startEdit = student => {
    setEditingId(student.id)
    setEditForm({ name: student.name, major: student.major, year: student.year, gpa: student.gpa })
  }

  const handleSave = async id => {
    await updateStudent({ id, ...editForm })
    setEditingId(null)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'gpa' ? Number(value) : value,
    }))
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p style={s.error}>Error loading students</p>

  return (
    <div style={s.section}>
      <div style={s.toolbar}>
        <strong>รายชื่อนักศึกษา</strong>
        {isFetching && <span style={s.badge}>↻ Syncing…</span>}
        <button style={s.btn} onClick={refetch}>↻ Refresh</button>
      </div>

      <table style={s.table}>
        <thead>
          <tr>
            {['ชื่อ', 'สาขา', 'ปี', 'GPA', 'Actions'].map(h => (
              <th key={h} style={s.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              {editingId === student.id ? (
                <>
                  <td style={s.td}><input style={s.input} name="name" value={editForm.name} onChange={handleChange} /></td>
                  <td style={s.td}><input style={s.input} name="major" value={editForm.major} onChange={handleChange} /></td>
                  <td style={s.td}><input style={{ ...s.input, width: 50 }} name="year" value={editForm.year} onChange={handleChange} type="number" /></td>
                  <td style={s.td}><input style={{ ...s.input, width: 70 }} name="gpa" value={editForm.gpa} onChange={handleChange} type="number" step="0.01" /></td>
                  <td style={s.td}>
                    <button style={{ ...s.btnPrimary, marginRight: 6 }} onClick={() => handleSave(student.id)}>Save</button>
                    <button style={s.btn} onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={s.td}>{student.name}</td>
                  <td style={s.td}>{student.major}</td>
                  <td style={s.td}>{student.year}</td>
                  <td style={s.td}>{student.gpa.toFixed(2)}</td>
                  <td style={s.td}>
                    <button style={{ ...s.btnPrimary, marginRight: 6 }} onClick={() => startEdit(student)}>Edit</button>
                    <button style={s.btnDanger} onClick={() => deleteStudent(student.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
