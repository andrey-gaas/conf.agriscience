export default ({app})=>{

	app.router.beforeEach((to,from,next)=>{
    const currUser = app.store.getters.getUserToken
    const isAuth = to.matched.some(rout => rout.meta.auth)
    console.log(to, from, next);
    console.log(isAuth, currUser);
    if(!currUser && isAuth){ next('/login?message=login')
    }else{ next() }
	})
}

