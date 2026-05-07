import { useSelector } from 'react-redux'
import {
  selectAllStudents,
  selectStudentsStatus,
} from '../features/students/selectors'

function GpaSummary() {
  const students = useSelector(selectAllStudents)
  const status = useSelector(selectStudentsStatus)

  if (status !== 'succeeded' || students.length === 0) return null

  const avg = students.reduce((sum, s) => sum + Number(s.gpa), 0) / students.length

  return (
    <div className="gpa-summary">
      <span>Total students: <strong>{students.length}</strong></span>
      <span>Average GPA: <strong>{avg.toFixed(2)}</strong></span>
    </div>
  )
}

export default GpaSummary
