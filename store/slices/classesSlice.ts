import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { Group, ClassItem } from "../../types";
import { getAllClasses, deleteClass as deleteClassAPI, updateClass as updateClassAPI } from "../../lib/api/classRooms";

// Static group for display
const staticGroup: Group = {
  id: 1,
  name: "المجموعة الأساسية",
  day: ["Sunday", "Tuesday", "Thursday"],
  time: ["17:00", "17:00", "17:00"],
  maximumStudents: 25,
  groupPrice: 150,
  paymentPeriod: "Monthly",
  startDate: "2025-09-01",
  groupDescription: "المجموعة الأساسية للفصل",
  numberOfSessions: 10,
  students: [],
};

// Async thunk for fetching classes
export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async () => {
    const response = await getAllClasses();
    return response;
  }
);

// Async thunk for deleting classes
export const deleteClassThunk = createAsyncThunk(
  'classes/deleteClass',
  async (classId: number) => {
    await deleteClassAPI(classId);
    return classId;
  }
);

// Async thunk for updating classes
export const updateClassThunk = createAsyncThunk(
  'classes/updateClass',
  async ({ classId, updateData }: { 
    classId: number; 
    updateData: {
      start_year: number;
      end_year: number;
      name: string;
      status: boolean;
      subject_id: number;
      year: number;
    }
  }) => {
    const response = await updateClassAPI(classId, updateData);
    return response;
  }
);

interface ClassesState {
  classes: ClassItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ClassesState = {
  classes: [],
  loading: false,
  error: null,
};


// all components realted to classRooms
// 1- addModalClassRoom
// 2- classRoomsTable ✅
// 3- editModalClassRoom
// 4- deleteModalClassRoom
// 5- classRooms
// 6- classRoomsRow ✅
// 8- classRoomsTableRow ✅


const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass: (state, action: PayloadAction<ClassItem>) => {
      const newClass = { ...action.payload, groups: [staticGroup] };
      state.classes.push(newClass);
    },
    editClass: (state, action: PayloadAction<ClassItem>) => {
      const index = state.classes.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = { ...action.payload, groups: [staticGroup] };
      }
    },
    deleteClass: (state, action: PayloadAction<number>) => {
      state.classes = state.classes.filter((c) => c.id !== action.payload);
    },
// -------------------------------------------------------- for groups ----------------------------------


    addGroupToClass: (state, action: PayloadAction<{ classId: number; group: Group }>) => {
      const classIndex = state.classes.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1 && state.classes[classIndex].groups) {
        state.classes[classIndex].groups!.push(action.payload.group);
      }
    },
    editGroupInClass: (state, action: PayloadAction<{ classId: number; group: Group }>) => {
      const classIndex = state.classes.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1 && state.classes[classIndex].groups) {
        const groupIndex = state.classes[classIndex].groups!.findIndex((g) => g.id === action.payload.group.id);
        if (groupIndex !== -1) {
          state.classes[classIndex].groups![groupIndex] = action.payload.group;
        }
      }
    },
    deleteGroupFromClass: (state, action: PayloadAction<{ classId: number; groupId: number }>) => {
      const classIndex = state.classes.findIndex((c) => c.id === action.payload.classId);
      if (classIndex !== -1 && state.classes[classIndex].groups) {
        state.classes[classIndex].groups = state.classes[classIndex].groups!.filter(
          (group) => group.id !== action.payload.groupId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.map((classItem: ClassItem) => ({
          ...classItem,
          groups: [staticGroup]
        }));
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch classes';
      })
      .addCase(deleteClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = state.classes.filter(c => c.id !== action.payload);
      })
      .addCase(deleteClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete class';
      })
      .addCase(updateClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.classes.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.classes[index] = { ...action.payload, groups: [staticGroup] };
        }
      })
      .addCase(updateClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update class';
      });
  },
});

export const { addClass, editClass, deleteClass, addGroupToClass, editGroupInClass, deleteGroupFromClass } = classesSlice.actions;
export default classesSlice.reducer;