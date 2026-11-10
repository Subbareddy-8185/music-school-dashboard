import { useState } from "react";
import StudentList from "./components/StudentList";
import { initialStudents } from "./data/students";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  const toggleStudent = (id: number) =>
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, isActive: !student.isActive } : student))
    );

  return (
    <main className="container">
      <h1>Music School Dashboard</h1>
      <StudentList students={students} onToggle={toggleStudent} />
    </main>
  );
}