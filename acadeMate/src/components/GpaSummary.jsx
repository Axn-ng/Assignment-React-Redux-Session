// Step 6 — useGetStudentsQuery เติม cache; selectors อ่าน derived state (slide 31)
import { useSelector } from 'react-redux'
import { useGetStudentsQuery } from '../features/students/studentsApi'
import {
  selectAverageGpa,
  selectHighAchievers,
} from '../features/students/selectors'

function GpaSummary() {
  const { data: students = [] } = useGetStudentsQuery()
  const count = students.length
  const avgGpa = useSelector(selectAverageGpa)
  const highList = useSelector(selectHighAchievers)

  return (
    <div className="gpa-summary">
      <h2>Summary</h2>
      <div className="summary-cards">
        <div className="card">
          <span className="label">Total Students</span>
          <span className="value">{count}</span>
        </div>
        <div className="card">
          <span className="label">Average GPA</span>
          <span className="value">{avgGpa}</span>
        </div>
        <div className="card card--high">
          <span className="label">High Achievers (≥ 3.5)</span>
          <span className="value">{highList.length}</span>
        </div>
      </div>

      {highList.length > 0 && (
        <div className="high-achievers">
          <h3>High Achievers</h3>
          <ul>
            {highList.map((s) => (
              <li key={s.id}>
                {s.name} — GPA {s.gpa} ({s.major})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GpaSummary
