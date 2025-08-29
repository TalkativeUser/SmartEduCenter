import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ClassItem {
  id: number;
  name: string;
  teacher: string;
  status: "active" | "inactive";
  students: number;
  groups: Group[];
}

export interface Group {
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
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "اللغة العربيه",
      status: "active",
      grade: 10,
      parentName: `Parent ${i + 1}`,
    })),
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
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "اللغة الانجليزيه",
      status: "active",
      grade: 9,
      parentName: `Parent ${i + 1}`,
    })),
  },
  {
    id: 3,
    name: "الرياضيات",
    day: ["Saturday", "Monday"],
    time: ["14:00", "14:00"],
    maximumStudents: 20,
    groupPrice: 120,
    paymentPeriod: "Monthly",
    startDate: "2025-09-15",
    explanatoryText: "Math problem-solving sessions.",
    groupDescription: "Meets Sat & Mon at 2 PM.",
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "الرياضيات",
      status: "active",
      grade: 11,
      parentName: `Parent ${i + 1}`,
    })),
  },
  {
    id: 4,
    name: "الفيزياء",
    day: ["Tuesday", "Thursday"],
    time: ["12:00", "12:00"],
    maximumStudents: 15,
    groupPrice: 100,
    paymentPeriod: "Monthly",
    startDate: "2025-09-20",
    explanatoryText: "Physics concepts explained simply.",
    groupDescription: "Meets Tue & Thu at 12 PM.",
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "الفيزياء",
      status: "active",
      grade: 12,
      parentName: `Parent ${i + 1}`,
    })),
  },
  {
    id: 5,
    name: "الكيمياء",
    day: ["Wednesday", "Friday"],
    time: ["09:00", "09:00"],
    maximumStudents: 18,
    groupPrice: 110,
    paymentPeriod: "Monthly",
    startDate: "2025-09-25",
    explanatoryText: "Chemistry lab simulations and theory.",
    groupDescription: "Meets Wed & Fri at 9 AM.",
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "الكيمياء",
      status: "active",
      grade: 11,
      parentName: `Parent ${i + 1}`,
    })),
  },
  {
    id: 6,
    name: "علوم الحاسوب",
    day: ["Sunday", "Wednesday"],
    time: ["16:00", "16:00"],
    maximumStudents: 22,
    groupPrice: 200,
    paymentPeriod: "Monthly",
    startDate: "2025-10-01",
    explanatoryText: "Programming and algorithms for beginners.",
    groupDescription: "Meets Sun & Wed at 4 PM.",
    students: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      groupname: "علوم الحاسوب",
      status: "active",
      grade: 10,
      parentName: `Parent ${i + 1}`,
    })),
  },
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
    addGroupToClass: (state, action: PayloadAction<{ classId: number; group: Group }>) => {
      const classIndex = state.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1) {
        state[classIndex].groups.push(action.payload.group);
      }
    },
    editGroupInClass: (state, action: PayloadAction<{ classId: number; group: Group }>) => {
      const classIndex = state.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1) {
        const groupIndex = state[classIndex].groups.findIndex((g) => g.id === action.payload.group.id);
        if (groupIndex !== -1) {
          state[classIndex].groups[groupIndex] = action.payload.group;
        }
      }
    },
    deleteGroupFromClass: (state, action: PayloadAction<{ classId: number; groupId: number }>) => {
      const classIndex = state.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1) {
        state[classIndex].groups = state[classIndex].groups.filter(
          (group) => group.id !== action.payload.groupId
        );
      }
    },
  },
});

export const { addClass, editClass, deleteClass, addGroupToClass, editGroupInClass, deleteGroupFromClass } = classesSlice.actions;
export default classesSlice.reducer;