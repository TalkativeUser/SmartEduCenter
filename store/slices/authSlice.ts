import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

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
    },
    clearError: (state) => {
      state.error = null
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

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer
