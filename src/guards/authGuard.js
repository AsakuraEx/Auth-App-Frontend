import { jwtDecode } from "jwt-decode"

const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)

  if (to.meta.requiresAuth) {
    // No hay token → redirige
    if (!token) {
      return next({ name: 'login' })
    }

    // Hay token pero está expirado → redirige
    if (Date.now() > decoded.exp * 1000) {
      localStorage.clear()
      return next({ name: 'login' })
    }
  }

  next()
}

export default authGuard;