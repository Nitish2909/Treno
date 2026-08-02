import { createSlice } from '@reduxjs/toolkit'

// Helper function to safely parse localStorage items without crashing
const getSafeParsedStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error)
    return null
  }
}

const initialState = {
  user: getSafeParsedStorage('user'),
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: getSafeParsedStorage('isAuthenticated') ?? false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload

      state.user = user
      state.accessToken = accessToken
      state.isAuthenticated = Boolean(accessToken)
      state.isLoading = false

      // Sync with localStorage
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
      }
      localStorage.setItem('isAuthenticated', JSON.stringify(Boolean(accessToken)))
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.isLoading = false

      // Properly remove keys from storage
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('isAuthenticated')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      
      // Keep localStorage in sync with user updates
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setToken: (state, action) => {
      state.accessToken = action.payload
      if (action.payload) {
        localStorage.setItem('accessToken', action.payload)
      } else {
        localStorage.removeItem('accessToken')
      }
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