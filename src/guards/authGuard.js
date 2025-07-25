const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  const fechaExpiracion = new Date(localStorage.getItem('expiracion'))

  if (to.meta.requiresAuth) {
    // No hay token → redirige
    if (!token) {
      return next({ name: 'login' })
    }

    // Hay token pero está expirado → redirige
    if (Date.now() > fechaExpiracion.getTime()) {
      localStorage.clear()
      return next({ name: 'login' })
    }
  }

  next()
}

export default authGuard;