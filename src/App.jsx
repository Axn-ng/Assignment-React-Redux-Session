import StudentTable from './features/students/StudentTable'
import AddStudentForm from './features/students/AddStudentForm'

const styles = {
  wrapper: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    background: '#1e2a6e',
    color: '#fff',
    padding: '1.5rem 2rem',
    borderRadius: 8,
    marginBottom: '1.5rem',
  },
  title: { margin: 0, fontSize: '1.6rem' },
  subtitle: { margin: '0.25rem 0 0', fontSize: '0.9rem', opacity: 0.75 },
}

function App() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>AcadeMate — Session 7</h1>
        <p style={styles.subtitle}>
          Optimistic Updates · Polling · Custom Middleware
        </p>
      </div>
      <AddStudentForm />
      <StudentTable />
    </div>
  )
}

export default App
