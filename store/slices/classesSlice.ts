import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  status: "active" | "inactive";
  students: number;
  groups: Group[];
}

interface Group {
  id: number;
  name: string;
  day: string[];
  time: string[];
  maximumStudents: number;
  groupPrice: number;
  paymentPeriod: "Daily" | "Monthly";
  startDate: string;
  explanatoryText: string;
  groupDescription: string;
  students: {
    id: number;
    name: string;
    status: "active" | "inactive";
    grade: number;
    parentName: string;
  }[];
}

const groups: Group[] = [
  {
    id: 1,
    name: "اللغة العربيه",
    day: ["Sunday", "Tuesday", "Thursday"],
    time: ["17:00", "17:00", "17:00"],
    maximumStudents: 25,
    groupPrice: 150,
    paymentPeriod: "Monthly",
    startDate: "2025-09-01",
    explanatoryText: "Evening group focusing on advanced JavaScript.",
    groupDescription: "Meets Sun/Tue/Thu at 5 PM.",
    students: [
      {
        id: 1,
        name: "Student 1",
        status: "active",
        grade: 10,
        parentName: "Parent 1",
      },
      {
        id: 2,
        name: "Student 2",
        status: "active",
        grade: 10,
        parentName: "Parent 2",
      },
    ]
  },
  {
    id: 2,
    name: "اللغة الانجليزيه",
    day: ["Monday", "Wednesday"],
    time: ["10:00", "10:00"],
    maximumStudents: 12,
    groupPrice: 80,
    paymentPeriod: "Daily",
    startDate: "2025-09-10",
    explanatoryText: "Morning reading club for kids.",
    groupDescription: "Meets Mon & Wed at 10 AM.",
    students: [
      {
        id: 1,
        name: "Student 1",
        status: "active",
        grade: 10,
        parentName: "Parent 1",
      },
      {
        id: 2,
        name: "Student 2",
        status: "active",
        grade: 10,
        parentName: "Parent 2",
      },
    ]
  }
];

const initialClasses: ClassItem[] = [
  { id: 1, name: "Algebra I", teacher: "Mr. Smith", status: "active", students: 28, groups: groups },
  { id: 2, name: "World History", teacher: "Ms. Davis", status: "active", students: 25, groups: groups },
  { id: 3, name: "Chemistry Basics", teacher: "Dr. Brown", status: "inactive", students: 0, groups: groups },
];

const classesSlice = createSlice({
  name: "classes",
  initialState: initialClasses,
  reducers: {
    addClass: (state, action: PayloadAction<ClassItem>) => {
      state.push(action.payload);
    },
    editClass: (state, action: PayloadAction<ClassItem>) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteClass: (state, action: PayloadAction<number>) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addClass, editClass, deleteClass } = classesSlice.actions;
export default classesSlice.reducer;