import { useSelector } from 'react-redux';
// Session 5: selectStudentCount มาจาก studentsSlice (entity adapter exports)
import { selectStudentCount } from '../features/students/studentsSlice';
// Derived selectors (memoized) มาจาก selectors.js
import { selectAverageGpa, selectHighAchievers, selectGpaDistribution } from '../features/students/selectors';

function GpaSummary() {
  const count       = useSelector(selectStudentCount);
  const averageGpa  = useSelector(selectAverageGpa);
  const highAchievers = useSelector(selectHighAchievers);
  const dist        = useSelector(selectGpaDistribution);

  return (
    <div className="gpa-summary">
      <h2>สรุปภาพรวม</h2>
      <div className="summary-cards">
        <div className="card">
          <span className="label">นักศึกษาทั้งหมด</span>
          <span className="value">{count}</span>
        </div>
        <div className="card">
          <span className="label">GPA เฉลี่ย</span>
          <span className="value">{averageGpa}</span>
        </div>
        <div className="card card--high">
          <span className="label">เกรดดีเยี่ยม (≥3.5)</span>
          <span className="value">{dist.high}</span>
        </div>
        <div className="card card--medium">
          <span className="label">เกรดปานกลาง (2.5–3.5)</span>
          <span className="value">{dist.medium}</span>
        </div>
        <div className="card card--low">
          <span className="label">เกรดต่ำ (&lt;2.5)</span>
          <span className="value">{dist.low}</span>
        </div>
      </div>

      {highAchievers.length > 0 && (
        <div className="high-achievers">
          <h3>นักศึกษาเกรดดีเยี่ยม</h3>
          <ul>
            {highAchievers.map(s => (
              <li key={s.id}>
                {s.name} — GPA {s.gpa} ({s.major})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GpaSummary;
