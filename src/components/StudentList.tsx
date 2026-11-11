import { useMemo, useState } from "react";
import type { Student, StatusTab } from "../types";
import { useDebounce } from "../hooks/useDebounce";

interface StudentListProps {
  students: Student[];
  onToggle: (id: number) => void;
}

const PAGE_SIZE_OPTIONS = [3, 6, 9];

export default function StudentList({ students, onToggle }: StudentListProps) {
  const [tab, setTab] = useState<StatusTab>("Active");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const debouncedQuery = useDebounce(query.trim().toLowerCase(), 300);

  // derived values: not stored in state
  const activeCount = students.filter((s) => s.isActive).length;
  const inactiveCount = students.length - activeCount;

  const filtered = useMemo(
    () =>
      students.filter((student) => {
        const matchesTab = tab === "Active" ? student.isActive : !student.isActive;
        const matchesQuery =
          !debouncedQuery ||
          student.name.toLowerCase().includes(debouncedQuery) ||
          student.email.toLowerCase().includes(debouncedQuery);
        return matchesTab && matchesQuery;
      }),
    [students, tab, debouncedQuery]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  // clamp: if the last item on the last page is toggled away, we never land on an empty page
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const from = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, filtered.length);

  // reset to page 1 inside event handlers, not in useEffect
  const changeTab = (next: StatusTab) => {
    setTab(next);
    setPage(1);
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const changePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  const goTo = (p: number) => setPage(Math.min(Math.max(p, 1), totalPages));

  return (
    <section>
      <h2>My Students</h2>

      <div className="toolbar">
        <div role="tablist" aria-label="Student status">
          <button
            role="tab"
            aria-selected={tab === "Active"}
            className={tab === "Active" ? "tab selected" : "tab"}
            onClick={() => changeTab("Active")}
          >
            Active ({activeCount})
          </button>
          <button
            role="tab"
            aria-selected={tab === "Inactive"}
            className={tab === "Inactive" ? "tab selected" : "tab"}
            onClick={() => changeTab("Inactive")}
          >
            Inactive ({inactiveCount})
          </button>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search by name or email"
          aria-label="Search students"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No {tab} students found.</p>
      ) : (
        <>
          <ul className="cards">
            {pageItems.map((student) => (
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

          <div className="pagination-bar">
            <p className="range">
              Showing {from}–{to} of {filtered.length}
            </p>

            <nav className="pagination" aria-label="Pagination">
              <button
                className="page-btn"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={p === currentPage ? "page-btn selected" : "page-btn"}
                  onClick={() => goTo(p)}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>

            <label className="page-size">
              Per page{" "}
              <select
                value={pageSize}
                onChange={(e) => changePageSize(Number(e.target.value))}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </>
      )}
    </section>
  );
}