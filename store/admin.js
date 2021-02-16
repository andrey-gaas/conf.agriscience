export const state = () => ({
  allReports:[],
  userList:[],
});
export const mutations = {
  setReports(s,reports){ s.allReports = reports },
  setUsers(s,users){ s.userList = users}
}
export const getters = {
  getReportsList: s => s.allReports,
  getUsersList: s => s.userList,
}
export const actions = {
  async fetchReports({commit, rootGetters}, filter){
    const axios = rootGetters.getAxiosWithToken
    await axios.get('/admin/reports', filter).
    then( res => {
      commit('setReports', res.data)
    })
  },
  async fetchUsers({commit, rootGetters}, filter){
    const axios = rootGetters.getAxiosWithToken
    let pathFilter = "?"
    for(let key in filter){
      pathFilter+=`${key}=${filter[key]}&`
    }
    console.log(pathFilter);
    await axios.get(`/admin/users${pathFilter}`).
    then( res => {
      console.log(res.data);
      commit('setUsers', res.data)
    })
  },
}
