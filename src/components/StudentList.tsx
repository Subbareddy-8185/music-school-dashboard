import { useMemo, useState } from "react";
import type { Student, StatusTab } from "../types";
import { useDebounce } from "../hooks/useDebounce";

interface StudentListProps {
  students: Student[];
  onToggle: (id: number) => void;
}

export default function StudentList({ students, onToggle }: StudentListProps) {
  const [tab, setTab] = useState<StatusTab>("Active");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim().toLowerCase(), 300);

  // derived values: not stored in state
  const activeCount = students.filter((s) => s.isActive).length;
  const inactiveCount = students.length - activeCount;

  const visible = useMemo(
    () =>
      students.filter((s) => {
        const matchesTab = tab === "Active" ? s.isActive : !s.isActive;
        const matchesQuery =
          !debouncedQuery ||
          s.name.toLowerCase().includes(debouncedQuery) ||
          s.email.toLowerCase().includes(debouncedQuery);
        return matchesTab && matchesQuery;
      }),
    [students, tab, debouncedQuery]
  );

  return (
    <section>
      <h2>My Students</h2>

      <div className="toolbar">
        <div role="tablist" aria-label="Student status">
          <button
            role="tab"
            aria-selected={tab === "Active"}
            className={tab === "Active" ? "tab selected" : "tab"}
            onClick={() => setTab("Active")}
          >
            Active ({activeCount})
          </button>
          <button
            role="tab"
            aria-selected={tab === "Inactive"}
            className={tab === "Inactive" ? "tab selected" : "tab"}
            onClick={() => setTab("Inactive")}
          >
            Inactive ({inactiveCount})
          </button>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email"
          aria-label="Search students"
        />
      </div>

      {visible.length === 0 ? (
        <p className="empty">No {tab} students found.</p>
      ) : (
        <ul className="cards">
          {visible.map((student) => (
            <li key={student.id} className="card">
              <h3>{student.name}</h3>
              <p>{student.email}</p>
              <p>{student.city}</p>
              <label>
                <input
                  type="checkbox"
                  checked={student.isActive}
                  onChange={() => onToggle(student.id)}
                />{" "}
                {student.isActive ? "Active" : "Inactive"}
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}