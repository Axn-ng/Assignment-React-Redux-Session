import { useSelector } from 'react-redux'
import {
  selectStudentCount,
  selectAverageGpa,
  selectHighAchievers,
} from '../features/students/selectors'

function GpaSummary() {
  const count    = useSelector(selectStudentCount)
  const avgGpa   = useSelector(selectAverageGpa)
  const highList = useSelector(selectHighAchievers)

  return (
    <div className="gpa-summary">
      <div className="gpa-card gpa-card--purple">
        <div className="gpa-label">นักศึกษาทั้งหมด</div>
        <div className="gpa-value">{count}</div>
        <div className="gpa-card-bg-shape" />
      </div>
      <div className="gpa-card gpa-card--blue">
        <div className="gpa-label">GPA เฉลี่ย</div>
        <div className="gpa-value">{avgGpa}</div>
        <div className="gpa-card-bg-shape" />
      </div>
      <div className="gpa-card gpa-card--green">
        <div className="gpa-label">เกียรตินิยม (GPA ≥ 3.5)</div>
        <div className="gpa-value">{highList.length}</div>
        <div className="gpa-card-bg-shape" />
      </div>
    </div>
  )
}

export default GpaSummary
