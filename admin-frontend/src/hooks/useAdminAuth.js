import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout as logoutAction } from '../store/slices/adminAuthSlice'
import { useAdminLogoutMutation } from '../store/api/adminApi'

export function useAdminAuth() {
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const { user, token, isAuthenticated } = useSelector((state) => state.adminAuth)
  const [logoutApi] = useAdminLogoutMutation()

  async function logout() {
    try {
      await logoutApi().unwrap()
    } catch {
      // Ignore server error – clear local state regardless
    }
    dispatch(logoutAction())
    navigate('/admin/login', { replace: true })
  }

  return { user, token, isAuthenticated, logout }
}
