import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './features/students/studentsThunks';
import { selectStudentsStatus, selectStudentsError } from './features/students/selectors';
import GpaSummary from './components/GpaSummary';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const status   = useSelector(selectStudentsStatus);
  const error    = useSelector(selectStudentsError);
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Session 5 — createEntityAdapter &amp; createSelector</p>
      </header>

      {error && <div className="error-banner">เกิดข้อผิดพลาด: {error}</div>}

      <main className="app-main">
        <section className="section-form">
          <StudentForm
            editTarget={editTarget}
            onDone={() => setEditTarget(null)}
          />
        </section>

        <section className="section-summary">
          <GpaSummary />
        </section>

        <section className="section-table">
          <h2>รายชื่อนักศึกษา</h2>
          <StudentTable onEdit={setEditTarget} />
        </section>
      </main>
    </div>
  );
}

export default App;
