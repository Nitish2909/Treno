import { createSlice } from '@reduxjs/toolkit'

const TOKEN_KEY = 'treno_admin_token'
const USER_KEY  = 'treno_admin_user'

function loadFromStorage() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const user  = JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    return { token, user, isAuthenticated: !!token }
  } catch {
    return { token: null, user: null, isAuthenticated: false }
  }
}

const initialState = loadFromStorage()

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { admin, token } = action.payload
      state.user            = admin
      state.token           = token
      state.isAuthenticated = true
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY,  JSON.stringify(admin))
    },
    updateAdminProfile(state, action) {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem(USER_KEY, JSON.stringify(state.user))
    },
    logout(state) {
      state.user            = null
      state.token           = null
      state.isAuthenticated = false
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
  },
})

export const { setCredentials, updateAdminProfile, logout } = adminAuthSlice.actions
export default adminAuthSlice.reducer
