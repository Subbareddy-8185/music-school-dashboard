import { useEffect } from "react";
import StudentList from "../components/StudentList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadStudents, toggleStudent } from "../store/studentsSlice";

export default function SchoolDashboard() {
  const dispatch = useAppDispatch();
  const { items, status, error, actionError } = useAppSelector((s) => s.students);

  useEffect(() => {
    const request = dispatch(loadStudents());
    return () => request.abort(); 
  }, [dispatch]);

  const handleToggle = (id: number) => {
    const student = items.find((s) => s.id === id);
    if (!student) return;
    void dispatch(toggleStudent({ id, isActive: !student.isActive }));
  };

  const loading = status === "idle" || status === "loading";

  if (loading) {
    return (
      <section aria-busy="true">
        <h2>My Students</h2>
        <p role="status">Loading students…</p>
        <ul className="cards">
          {[1, 2, 3].map((n) => (
            <li key={n} className="card skeleton" aria-hidden="true" />
          ))}
        </ul>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <div role="alert" className="error-box">
        <p>{error}</p>
        <button className="page-btn" onClick={() => void dispatch(loadStudents())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {actionError && (
        <p role="alert" className="error-box">
          {actionError}
        </p>
      )}
      <StudentList students={items} onToggle={handleToggle} />
    </>
  );
}