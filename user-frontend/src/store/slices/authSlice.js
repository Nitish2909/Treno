import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload)
      const { user, accessToken } = action.payload
      localStorage.setItem("user",JSON.stringify(user))
      state.user = JSON.parse(localStorage.getItem("user")) || user
      state.accessToken = accessToken
      state.isAuthenticated = true
      state.isLoading = false
      if (accessToken) {
        
        localStorage.setItem('accessToken', accessToken)
      }
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.isLoading = false
      localStorage.removeItem('accessToken')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setToken: (state, action) => {
      state.accessToken = action.payload
      localStorage.setItem('accessToken', action.payload)
    },
  },
})

export const { setCredentials, logout, updateUser, setLoading, setToken } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectAccessToken = (state) => state.auth.accessToken
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
