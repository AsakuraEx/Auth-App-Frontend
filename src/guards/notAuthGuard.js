const notAuthGuard = (to, from, next) => {

    const isAuthenticated = !!localStorage.getItem('token');

    if(to.name === 'login'){

        if(isAuthenticated){
            next({name: 'home'})
        }else {
            next()
        }

    }


}

export default notAuthGuard