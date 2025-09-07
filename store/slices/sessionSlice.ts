// src/store/slices/sessionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SessionState {
  expiryTime: number | null // timestamp in ms
}

const initialState: SessionState = {
  expiryTime: null,
}

const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // بدء السيشن: نزود expiry time (Date.now() + 30*60*1000)
    startSession: (state, action: PayloadAction<number>) => {
      state.expiryTime = action.payload
      try {
        localStorage.setItem("expiryTime", action.payload.toString())
      } catch { /* ignore */ }
    },
    // load from localStorage (call once on app init)
    loadSessionFromStorage: (state) => {
      try {
        const v = localStorage.getItem("expiryTime")
        state.expiryTime = v ? parseInt(v, 10) : null
      } catch {
        state.expiryTime = null
      }
    },
    // clear when user logs out manually OR when auto-logout fires
    clearSession: (state) => {
      state.expiryTime = null
      try {
        localStorage.removeItem("expiryTime")
      } catch {}
    },
  },
})

export const { startSession, loadSessionFromStorage, clearSession } = slice.actions
export default slice.reducer
