import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../app/courseSlice'
import CourseCard from '../components/CourseCard'

function CoursesPage() {
  const dispatch = useDispatch()
  const { courses, selectedCourse, loading, error } = useSelector(
    (state) => state.courses
  )

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  if (loading) return <p className="status-msg">Loading courses...</p>
  if (error) return <p className="status-msg error">Error: {error}</p>

  return (
    <div className="courses-page">
      <h1>acadeMate Courses</h1>

      {selectedCourse && (
        <div className="selected-course">
          <h2>Selected: {selectedCourse.title}</h2>
          <p>{selectedCourse.body}</p>
        </div>
      )}

      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
          />
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
