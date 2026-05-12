import { useSelector } from 'react-redux';
// Session 5: selectStudentIds แทนการ map array ทั้งหมด
import { selectStudentIds } from '../features/students/studentsSlice';
import { selectStudentsStatus } from '../features/students/selectors';
import StudentRow from './StudentRow';

function StudentTable({ onEdit }) {
  // subscribe เฉพาะ ids array — ไม่ re-render เมื่อข้อมูลใน entity เปลี่ยน
  const ids    = useSelector(selectStudentIds);
  const status = useSelector(selectStudentsStatus);

  if (status === 'loading') {
    return <p className="loading">กำลังโหลดข้อมูล...</p>;
  }

  if (!ids.length) {
    return <p className="empty">ยังไม่มีข้อมูลนักศึกษา</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>สาขา</th>
          <th>GPA</th>
          <th>การดำเนินการ</th>
        </tr>
      </thead>
      <tbody>
        {/* ส่ง id ให้ StudentRow ดึงข้อมูลเอง — O(1) lookup */}
        {ids.map(id => (
          <StudentRow key={id} id={id} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
