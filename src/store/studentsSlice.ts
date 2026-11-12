import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Student } from "../types";
import { fetchStudents, updateStudentStatus } from "../api/studentsApi";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface StudentsState {
  items: Student[];
  status: Status;
  error: string | null;      
  actionError: string | null; 
}

const initialState: StudentsState = {
  items: [],
  status: "idle",
  error: null,
  actionError: null,
};

interface ToggleArg {
  id: number;
  isActive: boolean; 
}

export const loadStudents = createAsyncThunk(
  "students/load",
  (_arg: void, { signal }) => fetchStudents(signal)
);

export const toggleStudent = createAsyncThunk(
  "students/toggle",
  async (arg: ToggleArg) => {
    await updateStudentStatus(arg.id, arg.isActive);
    return arg;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearActionError(state) {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(loadStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.actionError = null;
      })
      .addCase(loadStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadStudents.rejected, (state, action) => {
        if (action.meta.aborted) return; // cancelled on purpose, not an error
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      // ---- toggle: optimistic update with rollback ----
      .addCase(toggleStudent.pending, (state, action) => {
        state.actionError = null;
        const student = state.items.find((s) => s.id === action.meta.arg.id);
        if (student) student.isActive = action.meta.arg.isActive; // update UI first
      })
      .addCase(toggleStudent.rejected, (state, action) => {
        const student = state.items.find((s) => s.id === action.meta.arg.id);
        if (student) student.isActive = !action.meta.arg.isActive; // roll back
        state.actionError = "Could not update the student. The change was reverted.";
      });
  },
});

export const { clearActionError } = studentsSlice.actions;
export default studentsSlice.reducer;