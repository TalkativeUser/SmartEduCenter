import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id: number;
  name: string;
  parentPhone: string;
  groupsname: string[];
  classRoomName: string;
  studentCode: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Neil Sims",
    parentPhone: "1234567890",
    groupsname: ["الاحد علوم 6 م ","اللغة العربيه الاثنين 5 م","اللغة الانجليزيه الاثنين 2 م"],
    classRoomName: "الصف الاول الاعدادى",
    studentCode: "123456",
  },
  {
    id: 2,
    name: "Bonnie Green",
    parentPhone: "1234567890",
    groupsname: ["علوم الحاسوب","اللغة العربيه الاثنين 5 م","اللغة الانجليزيه الاثنين 2 م"],
    classRoomName: "الصف الاول الاعدادى",
    studentCode: "123456",
  },
  {
    id: 3,
    name: "Jese Leos",
    parentPhone: "1234567890",
    groupsname: ["علوم الحاسوب","اللغة العربيه الاثنين 5 م","اللغة الانجليزيه الاثنين 2 م"],
    classRoomName: "الصف الاول الاعدادى",
    studentCode: "123456",
      },
  {
    id: 4,
    name: "Thomas Lean",
    parentPhone: "1234567890",
    groupsname: ["علوم الحاسوب","اللغة العربيه الاثنين 5 م","اللغة الانجليزيه الاثنين 2 م"],
    classRoomName: "الصف الاول الاعدادى",
    studentCode: "123456",
      },
  {
    id: 5,
    name: "Leslie Livingston",
    parentPhone: "1234567890",
    groupsname: ["علوم الحاسوب","اللغة العربيه الاثنين 5 م","اللغة الانجليزيه الاثنين 2 م"],
    classRoomName: "الصف الاول الاعدادى",
    studentCode: "123456",
  },
];

const studentsSlice = createSlice({
  name: "students",
  initialState: initialStudents,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.push(action.payload);
    },
    editStudent: (state, action: PayloadAction<Student>) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
