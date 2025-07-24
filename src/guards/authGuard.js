const authGuard = (to, from, next) => {

    const isAuthenticated = !!localStorage.getItem('token');
    const fechaExpiracion = new Date(localStorage.getItem('expiracion'));

    if(to.meta.requiresAuth && !isAuthenticated) {

        if(Date.now() > fechaExpiracion.getTime())
        next({name: 'login'})
    }else {
        next()
    }

}

export default authGuard