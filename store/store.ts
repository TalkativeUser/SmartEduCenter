import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import studentsReducer from "./slices/studentsSlice"
import classesReducer from "./slices/classesSlice"
import sessionReducer from "./slices/sessionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    students: studentsReducer,
    classes: classesReducer,
    session: sessionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
