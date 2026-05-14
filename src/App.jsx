import GpaSummary from './components/GpaSummary'
import StudentTable from './components/StudentTable'
import StudentForm from './components/StudentForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Session 8 — Testing & Deploy</p>
      </header>

      <main className="app-main">
        <section className="section-form">
          <StudentForm />
        </section>

        <section className="section-summary">
          <GpaSummary />
        </section>

        <section className="section-table">
          <h2>รายชื่อนักศึกษา</h2>
          <StudentTable />
        </section>
      </main>
    </div>
  )
}

export default App
