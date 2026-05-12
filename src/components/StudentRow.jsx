import { useSelector, useDispatch } from 'react-redux';
// Session 5: selectStudentById — O(1) lookup โดย entity adapter
import { selectStudentById } from '../features/students/studentsSlice';
import { deleteStudentAsync } from '../features/students/studentsThunks';

function StudentRow({ id, onEdit }) {
  // แต่ละ row subscribe เฉพาะ entity ของตัวเอง
  // re-render เฉพาะเมื่อ student คนนี้เปลี่ยน
  const student = useSelector(state => selectStudentById(state, id));
  const dispatch = useDispatch();

  if (!student) return null;

  const gpaClass =
    student.gpa >= 3.5 ? 'gpa--high' :
    student.gpa >= 2.5 ? 'gpa--medium' : 'gpa--low';

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.major}</td>
      <td className={gpaClass}>{student.gpa.toFixed(1)}</td>
      <td>
        <button className="btn btn--edit" onClick={() => onEdit(student)}>แก้ไข</button>
        <button
          className="btn btn--delete"
          onClick={() => dispatch(deleteStudentAsync(student.id))}
        >
          ลบ
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;
