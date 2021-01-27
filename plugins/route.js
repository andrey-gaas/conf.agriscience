export default ({app})=>{

	app.router.beforeEach((to,from,next)=>{
    const currUser = app.store.getters.getUserToken
    const isAuth = to.matched.some(rout => rout.meta.auth)
    if(!currUser && isAuth){ next('/login?message=login')
    }else{ next() }
	})
}

