import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getCookie, removeCookie } from "../../lib/cookiesMethods"

export interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "student" | "admin"
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
      // Clear cookies on logout
      removeCookie("teacherToken")
      removeCookie("teacherData")
      
    },
    clearError: (state) => {
      state.error = null
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    checkTeacherToken: (state) => {
      const teacherToken = getCookie("teacherToken")
      const teacherData = getCookie("teacherData")
      if (teacherToken && teacherData) {
        state.isAuthenticated = true
        try {
          state.user = JSON.parse(teacherData)
        } catch (error) {
          console.error("Error parsing teacher data from cookies:", error)
          state.user = null
        }
      }
    },

    startLoading: (state) => {
      state.loading = true
    },
    stopLoading: (state) => {
      state.loading = false
    },
  },

  //  الطريقه دى هى الاكثر استخداما وبنستخدمها فى حالة اننا مستخدمين 
  // الفانكشن  createAsyncThunk  انما احنا شغالين بالطريقة العاديه اللى هى 
  // بكتب ال actions  بأيدى  مش بأستخدام ال  builder 
  // extraReducers:(builder)=>{

  //     builder.addCase(loginStart.pending, (state) => { state.loading = true })
  //     builder.addCase(loginStart.fulfilled, (state, action) => { state.user = action.payload })
  //     builder.addCase(loginStart.rejected, (state, action) => { state.error = action.error.message })

  // }

})

export const { loginStart, loginSuccess, loginFailure, logout, clearError, registerStart, registerSuccess, registerFailure, checkTeacherToken , startLoading , stopLoading } = authSlice.actions
export default authSlice.reducer
