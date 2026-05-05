import { useDispatch } from 'react-redux'
import { fetchCourseById, clearSelectedCourse } from '../app/courseSlice'

function CourseCard({ course, isSelected }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (isSelected) {
      dispatch(clearSelectedCourse())
    } else {
      dispatch(fetchCourseById(course.id))
    }
  }

  return (
    <div
      className={`course-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <span className="course-id">#{course.id}</span>
      <h3>{course.title}</h3>
      <p>{course.body}</p>
    </div>
  )
}

export default CourseCard
