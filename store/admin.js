export const state = () => ({
  allReport:[],
})
export const mutations = () => ({
  setAllReport(s, reports){
    console.log(s);
  }
})
export const getters = () => ({
  getAdmin: s => s.asdf,
})
export const actions = () => ({
  async fetchAllReports({commit, getters}){
    console.log('in fetch all reports');
    const axios = getters.getAxiosWithToken
    await axios.get('/reports/all').
      then( res => {
        commit('setAllReport', res.data)
      })
  },
})
