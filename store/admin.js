export const state = () => ({
  allReport:[],
});
export const mutations = {
  setAllReport(s, reports){
    console.log(reports);
  }
}
export const getters = {
  getAdmin: s => s.asdf,
}
export const actions = {
  async fetchAllReports({commit, rootGetters}){
    const axios = rootGetters.getAxiosWithToken
    await axios.get('/reports/all').
    then( res => {
      commit('setAllReport', res.data)
    })
  },
}
