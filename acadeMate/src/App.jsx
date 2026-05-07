import { useState } from 'react'
import CoursesPage from './pages/CoursesPage'
import GpaSummary from './components/GpaSummary'
import AddStudentForm from './components/AddStudentForm'
import StudentTable from './components/StudentTable'
import './App.css'

const TABS = [
  { key: 'students', label: 'Students' },
  { key: 'courses',  label: 'Courses'  },
]

export default function App() {
  const [tab, setTab] = useState('students')

  return (
    <>
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <header className="app-header">
        <div className="app-brand">
          <div className="app-logo">A</div>
          <span className="app-brand-name">AcadeMate</span>
        </div>
        <nav className="app-nav">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`nav-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="nav-divider" />

      <main className="app-main">
        {tab === 'students' ? (
          <div className="students-page">
            <div className="page-hero">
              <h1 className="page-title">Students</h1>
              <p className="page-sub">จัดการข้อมูลนักศึกษาผ่าน Redux Store</p>
            </div>
            <GpaSummary />
            <AddStudentForm />
            <StudentTable />
          </div>
        ) : (
          <CoursesPage />
        )}
      </main>
    </>
  )
}
