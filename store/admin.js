export const state = () => ({
  allReports:[],
  userList:[],
  userEdit:{},
  reportEdit:{},
});
export const mutations = {
  setReports(s,reports){ s.allReports = reports },
  setUsers(s,users){ s.userList = users},
  setUsersEditById(s,id){ s.userEdit = s.userList[id]},
  setUsersEdit(s,user){ s.userEdit = user},
  setReportEdit(s,report){ s.reportEdit = report},
  setReportEditStatus(s, status){
    const id = s.reportEdit.id
    for(let elem of s.allReports){
      if(elem.id === id){
        elem.status = status
        console.log({...s.reportEdit}, 7);
        break
      }
    }
  },
  saveUserEdit(s, user){
    for(let item of s.userList){
      if(item.id == user.id){;
        item = {...user}
        break;
      }
    }
  }
}
export const getters = {
  getReportsList: s => s.allReports,
  getUsersList: s => s.userList,
  getUsersEdit: s => s.userEdit,
  getReportEdit: s => s.reportEdit,
  getSpeakers: s => s.reportEdit.speakerList,
  getSpeakersEn: s => s.reportEdit.speakerListEn,
  getReportText: s => s.reportEdit.text,
  getReportName: s => s.reportEdit.title,
  getReportTextEn: s => s.reportEdit.textEn,
  getReportNameEn: s => s.reportEdit.titleEn,
}
export const actions = {
  async fetchReports({commit, rootGetters}, filter){
    const axios = rootGetters.getAxiosWithToken
    await axios.get('/admin/reports', filter).
    then( res => {
      commit('setReports', res.data)
    })
  },
  async fetchUserById({commit, rootGetters}, id){
    const axios = rootGetters.getAxiosWithToken
    await axios.get(`/admin/users?id=${id}`).
    then( res => {
      commit('setUsersEdit', res.data[0])
    })
  },
  async fetchReportById({commit, rootGetters}, id){
    const axios = rootGetters.getAxiosWithToken
    await axios.get(`/admin/reports?id=${id}`).
    then( res => {
      commit('setReportEdit', res.data[0])
    })
  },
  async fetchUsers({commit, rootGetters}, filter){
    const axios = rootGetters.getAxiosWithToken

    let pathFilter = "?"
    for(let key in filter){
      pathFilter+=`${key}=${filter[key]}&`
    }

    await axios.get(`/admin/users${pathFilter}`).
    then( res => {
      commit('setUsers', res.data)
    })
  },
  async saveUserEditBD({rootGetters, getters}, user){
    const axios = rootGetters.getAxiosWithToken,
          id = getters.getUsersEdit.id
    await axios.put('/admin/users/'+id, user)
  },
  async saveReportEditBD({rootGetters, getters}, report){
    const axios = rootGetters.getAxiosWithToken,
          id = report.id
    delete report.id;
    delete report._id;
    delete report.url;
    delete report.fileName;
    await axios.put('/admin/reports/'+id, report)
  },
  async userIsChecked({rootGetters, getters}){
    const axios = rootGetters.getAxiosWithToken,
          id = getters.getUsersEdit.id;
    await axios.put('/admin/users/'+id, {isUserChecked:true})
  },
  async reportIsChecked({rootGetters, getters}){
    const axios = rootGetters.getAxiosWithToken,
          id = getters.getReportEdit.id;
    try {
      await axios.put('/admin/reports/'+id, {isReportChecked:true})
    }catch(e){}
  },
  async failureReport({rootGetters, getters}){
    const axios = rootGetters.getAxiosWithToken,
          id = getters.getReportEdit.id;
    await axios.put('/admin/reports/'+id, {status:-1})
  },
  async approveReport({rootGetters, getters}){
    const axios = rootGetters.getAxiosWithToken,
          id = getters.getReportEdit.id;
    await axios.put('/admin/reports/'+id, {status:1})
    
  },
}
