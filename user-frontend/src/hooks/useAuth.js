import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentUser,
  selectAccessToken,
  selectIsAuthenticated,
  selectAuthLoading,
  logout,
  updateUser,
} from '../store/slices/authSlice.js'
import { useLogoutUserMutation } from '../store/api/authApi.js'
import { clearWishlist } from '../store/slices/wishlistSlice.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const accessToken = useSelector(selectAccessToken)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectAuthLoading)

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutUserMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      dispatch(logout())
      dispatch(clearWishlist())
      navigate('/')
      toast.success('Logged out successfully')
    } catch {
      // Force logout even if API fails
      dispatch(logout())
      dispatch(clearWishlist())
      navigate('/')
    }
  }

  const updateUserData = (data) => {
    dispatch(updateUser(data))
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    isLoggingOut,
    handleLogout,
    updateUserData,
    // Computed
    userName: user?.name || user?.firstName || 'User',
    userEmail: user?.email || '',
    userAvatar: user?.avatar || null,
    userInitials: user?.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : 'U',
    isAdmin: user?.role === 'admin',
  }
}
