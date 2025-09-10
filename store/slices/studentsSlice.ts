import { Student } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllStudentsThunk } from "../../lib/api/students";

interface StudentsState {
  students: Student[];
  studentsLoading: boolean;
  studentsError: string | null;
}

const initialState: StudentsState = {
  students: [],
  studentsLoading: false,
  studentsError: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    editStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentsThunk.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(getAllStudentsThunk.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudentsThunk.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload as string;
      });
  },
});

export const { addStudent, editStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
