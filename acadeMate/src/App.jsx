import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchStudents } from './features/students/studentsThunks'
import GpaSummary from './components/GpaSummary'
import AddStudentForm from './components/AddStudentForm'
import StudentTable from './components/StudentTable'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
      </header>
      <main className="app-main">
        <GpaSummary />
        <AddStudentForm />
        <StudentTable />
      </main>
    </div>
  )
}

export default App
