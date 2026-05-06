import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addStudent, deleteStudent, updateStudent } from './studentsSlice'

const EMPTY_FORM = { name: '', studentId: '', major: '', gpa: '' }

/* ── GPA Summary ─────────────────────────────────────── */
function GpaSummary({ students }) {
  const total   = students.length
  const avg     = total ? (students.reduce((s, st) => s + st.gpa, 0) / total).toFixed(2) : '–'
  const honours = students.filter(s => s.gpa >= 3.5).length

  return (
    <div className="gpa-summary">
      <div className="gpa-card gpa-card--purple">
        <div className="gpa-label">นักศึกษาทั้งหมด</div>
        <div className="gpa-value">{total}</div>
        <div className="gpa-card-bg-shape" />
      </div>
      <div className="gpa-card gpa-card--blue">
        <div className="gpa-label">GPA เฉลี่ย</div>
        <div className="gpa-value">{avg}</div>
        <div className="gpa-card-bg-shape" />
      </div>
      <div className="gpa-card gpa-card--green">
        <div className="gpa-label">เกียรตินิยม (GPA ≥ 3.5)</div>
        <div className="gpa-value">{honours}</div>
        <div className="gpa-card-bg-shape" />
      </div>
    </div>
  )
}

/* ── Form fields ─────────────────────────────────────── */
function Field({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={type === 'number' ? '0.01' : undefined}
        min={type === 'number' ? '0' : undefined}
        max={type === 'number' ? '4' : undefined}
        autoComplete="off"
      />
    </div>
  )
}

/* ── Add Student Form ────────────────────────────────── */
function AddStudentForm({ onAdd }) {
  const [form, setForm]   = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.studentId.trim() || !form.major.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    const gpa = parseFloat(form.gpa)
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      setError('GPA ต้องอยู่ระหว่าง 0.00 – 4.00')
      return
    }
    onAdd({ id: Date.now(), name: form.name.trim(), studentId: form.studentId.trim(), major: form.major.trim(), gpa })
    setForm(EMPTY_FORM)
    setError('')
  }

  return (
    <div className="form-card">
      <div className="form-card-header">
        <span className="form-card-title">เพิ่มนักศึกษาใหม่</span>
        <span className="form-card-sub">กรอกข้อมูลแล้วกดเพิ่ม</span>
      </div>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="ชื่อ – นามสกุล"  name="name"      value={form.name}      onChange={set} placeholder="Somchai Rakpong" />
          <Field label="รหัสนักศึกษา"    name="studentId" value={form.studentId} onChange={set} placeholder="6501006" />
          <Field label="สาขาวิชา"        name="major"     value={form.major}     onChange={set} placeholder="Computer Science" />
          <Field label="GPA"             name="gpa"       value={form.gpa}       onChange={set} type="number" placeholder="0.00 – 4.00" />
        </div>
        <button className="btn-primary" type="submit">เพิ่มนักศึกษา</button>
      </form>
    </div>
  )
}

/* ── Edit Modal ──────────────────────────────────────── */
function EditModal({ student, onSave, onClose }) {
  const [form, setForm]   = useState({
    name: student.name, studentId: student.studentId,
    major: student.major, gpa: String(student.gpa),
  })
  const [error, setError] = useState('')

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name.trim() || !form.studentId.trim() || !form.major.trim()) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง')
      return
    }
    const gpa = parseFloat(form.gpa)
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      setError('GPA ต้องอยู่ระหว่าง 0.00 – 4.00')
      return
    }
    onSave({ ...student, name: form.name.trim(), studentId: form.studentId.trim(), major: form.major.trim(), gpa })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <span className="modal-title">แก้ไขข้อมูลนักศึกษา</span>
          <button className="modal-close" onClick={onClose} aria-label="close">&#x2715;</button>
        </div>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Field label="ชื่อ – นามสกุล" name="name"      value={form.name}      onChange={set} />
            <Field label="รหัสนักศึกษา"   name="studentId" value={form.studentId} onChange={set} />
            <Field label="สาขาวิชา"       name="major"     value={form.major}     onChange={set} />
            <Field label="GPA"            name="gpa"       value={form.gpa}       onChange={set} type="number" />
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" type="button" onClick={onClose}>ยกเลิก</button>
            <button className="btn-primary" type="submit">บันทึกการเปลี่ยนแปลง</button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Student Table ───────────────────────────────────── */
function StudentTable({ students, onEdit, onDelete }) {
  const tier = gpa => gpa >= 3.5 ? 'honour' : gpa >= 3.0 ? 'good' : 'fair'

  if (students.length === 0) {
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
        <span className="count-chip">{students.length}</span>
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
            {students.map((s, i) => (
              <tr key={s.id} style={{ animationDelay: `${i * 40}ms` }} className="tr-animate">
                <td className="td-name">{s.name}</td>
                <td><code>{s.studentId}</code></td>
                <td className="td-major">{s.major}</td>
                <td><span className={`gpa-badge ${tier(s.gpa)}`}>{s.gpa.toFixed(2)}</span></td>
                <td>
                  <div className="action-cell">
                    <button className="btn-edit"   onClick={() => onEdit(s)}>แก้ไข</button>
                    <button className="btn-delete" onClick={() => onDelete(s.id)}>ลบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ── Page ────────────────────────────────────────────── */
export default function StudentsPage() {
  const students = useSelector(state => state.students.list)
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(null)

  const handleAdd    = s  => dispatch(addStudent(s))
  const handleDelete = id => { if (window.confirm('ยืนยันการลบนักศึกษา?')) dispatch(deleteStudent(id)) }
  const handleSave   = s  => { dispatch(updateStudent(s)); setEditing(null) }

  return (
    <div className="students-page">
      <div className="page-hero">
        <h1 className="page-title">Students</h1>
        <p className="page-sub">จัดการข้อมูลนักศึกษาผ่าน Redux Store</p>
      </div>

      <GpaSummary students={students} />
      <AddStudentForm onAdd={handleAdd} />
      <StudentTable students={students} onEdit={setEditing} onDelete={handleDelete} />

      {editing && (
        <EditModal student={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </div>
  )
}
