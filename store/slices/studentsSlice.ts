import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  avatar: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Neil Sims",
    email: "neil.sims@flowbite.com",
    position: "React Developer",
    status: "online",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
  },
  {
    id: 2,
    name: "Bonnie Green",
    email: "bonnie@flowbite.com",
    position: "Designer",
    status: "online",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
  },
  {
    id: 3,
    name: "Jese Leos",
    email: "jese@flowbite.com",
    position: "Vue JS Developer",
    status: "online",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
  },
  {
    id: 4,
    name: "Thomas Lean",
    email: "thomas@flowbite.com",
    position: "UI/UX Engineer",
    status: "online",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
  },
  {
    id: 5,
    name: "Leslie Livingston",
    email: "leslie@flowbite.com",
    position: "SEO Specialist",
    status: "offline",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Student-3-512.png",
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
