import './App.css'
import GpaSummary from './components/GpaSummary'
import AddStudentForm from './components/AddStudentForm'
import StudentTable from './components/StudentTable'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Session 6 — RTK Query</p>
      </header>
      <main className="app-main">
        <section className="section-summary">
          <GpaSummary />
        </section>

        <section className="section-form">
          <AddStudentForm />
        </section>

        <section className="section-table">
          <h2>Student List</h2>
          <StudentTable />
        </section>
      </main>
    </div>
  )
}

export default App
