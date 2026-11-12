import type { Student } from "../types";


function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}


const hasFlag = (name: string) => new URLSearchParams(window.location.search).has(name);

export async function fetchStudents(signal: AbortSignal): Promise<Student[]> {
  await delay(800, signal); 
  if (hasFlag("fail")) throw new Error("Failed to load students (simulated error).");

  const res = await fetch("/students.json", { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return (await res.json()) as Student[];
}

export async function updateStudentStatus(id: number, isActive: boolean): Promise<void> {
  await delay(400);
  if (hasFlag("failToggle")) throw new Error("Update failed (simulated error).");
  console.info("PATCH /students/%d", id, { isActive });
}