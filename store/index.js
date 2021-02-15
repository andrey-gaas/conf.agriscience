import Axios from 'axios';

export const state = () => ({
  loginData: {},
  isAuth: false,
  personData:{},
  personDataEn:{},
  personAboutMeRu:'',
  personAboutMeEn:'',
  toastMessag: '',
  speakerList:[
  ],
  speakerListEn:[
  ],
  reportText:'',
  reportName:'',
  reportTextEn:'',
  reportNameEn:'',
  indEditReport: -1,
  isLoadData: false,
  isEmailСonfirm: false,
  imgSrc:'',
  reportList:[],
  reportListEn:[],
  cookie: '',
  addReportID: -1,
  fileNameReportList: [],
  fileNameEditReport: '',
})

export const mutations = {
  setFileNameEditReport(s, name){
    s.fileNameEditReport = name
  },
  setFileNameReportList(s, list){
    s.fileNameReportList = list.map(el => {
      return el.fileName
    })
  },
  setAddReportID(s, rep){
    s.addReportID = rep.id
  },
  setEditReport(s, ind){
    
    let editReport,
        editReportEn;
    if(!s.reportList[ind]){
      editReport = { 
        title:'',
        annotations: '',
        status: 0,
        speakerList:[],
        fileName: '',
      }
      editReportEn = {...editReport}
    }else{
      editReport = s.reportList[ind]
      editReportEn = s.reportListEn[ind]
      if(editReport.status == 1) return
    }
    s.speakerList = editReport.speakerList.map(el => {return {...el}})
    s.reportText = editReport.annotations
    s.reportName = editReport.title
    s.indEditReport = ind

    s.speakerListEn = editReportEn.speakerList.map(el => {return {...el}})
    s.reportTextEn = editReportEn.annotations
    s.reportNameEn = editReportEn.title
    s.indEditReport = ind
    
    s.fileNameEditReport = s.fileNameReportList[ind]

  },
  setPersonData(state, userData){
    
    state.personData = {...state.personData,...userData}
  },
  setPersonDataEn(state, userData){
    state.personDataEn = userData
  },
  setToastMsg(state, text){
    state.toastMessag = text
  },
  setEmailСonfirm(state, res){
    state.isEmailСonfirm = res
  },
  setImgSrc(state, text){
    state.imgSrc = text
  },
  setIndReport(state, ind){
    state.indEditReport = ind
  },
  setReportList(state, list){
    state.reportList = list.map(el =>{
      return {
        title: el.title,
        annotations: el.annotations,
        status: el.status,
        speakerList: el.speakerList,
        id: el.id,
      }
    })
    state.reportListEn = list.map(el =>{
      return {
        title: el.titleEn,
        annotations: el.annotationsEn,
        status: el.status,
        speakerList: el.speakerListEn,
        id: el.id,
      }
    })
  },
  setPersonAboutMe(state, {aboutMe, locale}){
    if(locale == 'ru'){
      state.personAboutMeRu = aboutMe
    }else{
      state.personAboutMeEn = aboutMe
    }
  },
  setReportName(state, name){
    state.reportName = name
  },
  setReportText(state, text){
    state.reportText = text
  },
  saveReport(state, {report, ind}){
    const ruReport = {
      title: report.title,
      annotations: report.annotations, 
      status: report.status,
      speakerList: report.speakerList,
    }
    const enReport = {
      title: report.titleEn,
      annotations: report.annotationsEn, 
      status: report.status,
      speakerList: report.speakerListEn,
    }
    state.reportList.splice(ind, 1, ruReport)
    state.reportListEn.splice(ind, 1, enReport)
    state.fileNameReportList[ind] = report.fileName
  },
  upSpeaker(state, ind){
    if(ind == 0) return
      const el = {...state.speakerList[ind], num: ind-1}
      state.speakerList[ind-1].num = ind
      state.speakerList.splice(ind-1, 0, el)
      state.speakerList.splice(ind+1, 1)

      const elEn = {...state.speakerListEn[ind], num: ind-1}
      state.speakerListEn[ind-1].num = ind
      state.speakerListEn.splice(ind-1, 0, elEn)
      state.speakerListEn.splice(ind+1, 1)
  },
  downSpeaker(state, ind){
    if(ind == state.speakerList.length-1) return
      const el = {...state.speakerList[ind], num: ind+1}
      state.speakerList[ind+1].num = ind
      state.speakerList.splice(ind+2, 0, el)
      state.speakerList.splice(ind, 1)

      const elEn = {...state.speakerListEn[ind], num: ind+1}
      state.speakerListEn[ind+1].num = ind
      state.speakerListEn.splice(ind+2, 0, elEn)
      state.speakerListEn.splice(ind, 1)
  },
  setSpeaker(state, {speaker, ind}){
    state.speakerList[ind] = speaker
    state.speakerList.push('1')
    state.speakerList.pop()
  },
  setSpeakerEn(state, {speaker, ind}){
    state.speakerListEn[ind] = speaker
    state.speakerListEn.push('1')
    state.speakerListEn.pop()
  },
  addSpeaker(state, {speakerPerson, speakerPersonEn}){
    speakerPerson.num = state.speakerList.length
    state.speakerList.push(speakerPerson)
    speakerPersonEn.num = state.speakerListEn.length
    state.speakerListEn.push(speakerPersonEn)
  },
  deletSpeaker(state, ind){
    state.speakerList.splice(ind, 1)
    state.speakerListEn.splice(ind, 1)
  },
  toggleSpeaker(state, ind){
    state.speakerList[ind].isSpeaker = !state.speakerList[ind].isSpeaker
    state.speakerListEn[ind].isSpeaker = !state.speakerListEn[ind].isSpeaker
  },
  cleanDataReport(s){
    s.speakerList = []
    s.reportName = ''
    s.reportText = ''

    s.speakerListEn = []
    s.reportNameEn = ''
    s.reportTextEn = ''
  },
  logState(state){
    console.log(state)
  },
  setLoginData(s, data){
    s.loginData = data
  },
  toggleLoadData(s, boolean){
    s.isLoadData = boolean
  },
  setCookie(s){
    let cookieArr1 = document.cookie.split(/;/)
    let cookieArr2 = cookieArr1.map(el => {      
      return el.replace(/=/, ';')
    })
    let cookieArr3 = cookieArr2.map( el => {
      
      return el.split(/;/)
    })
    let cookieObj = {}
    for( let el of cookieArr3){
      let key = el[0].replace(/\s/g, '')
      let val = el[1].replace(/\s/g, '')
      cookieObj[key] = val
    }
    s.cookie = cookieObj
  }
}

export const getters = {
  getFileNameEditReport(s){
    return s.fileNameEditReport
  },
  getAddReportID(s){
    return s.addReportID
  },
  getCookie(s){
    return s.cookie
  },
  getPersonData(state){
    let result = {
      surname: state.personData.surname,
      name: state.personData.name,
      patronymic: state.personData.patronymic,
      organization: state.personData.organization,
      position: state.personData.position,
      place: state.personData.place,
      email: state.personData.email,
      telephone :state.personData.telephone,
    }
    return result
  },
  getPersonDataEn(state){
    let result = {
      surname: state.personData.surnameEn,
      name: state.personData.nameEn,
      patronymic: state.personData.patronymicEn,
      organization: state.personData.organizationEn,
      position: state.personData.positionEn,
      place: state.personData.placeEn,
      email: state.personData.email,
      telephone :state.personData.telephone,
    }
    return result
  },
  getPersonAboutMeRu(state){
    return state.personAboutMeRu
  },
  getPersonAboutMeEn(state){
    return state.personAboutMeEn
  },
  getSpeakers(state){
    return state.speakerList
  },
  getToastMsg(state){
    return state.toastMessag
  },
  getEmailСonfirm(state){
    return state.isEmailСonfirm
  },
  getImgSrc(state){
    return state.imgSrc
  },
  getSpeakersEn(state){
    return state.speakerListEn
  },
  getReportList(state){
    return state.reportList
  },
  getReportListEn(state){
    return state.reportListEn
  },
  getReportText(s){
    return s.reportText
  },
  getReportTextEn(s){
    return s.reportTextEn
  },
  getReportName(s){
    return s.reportName
  },
  getReportNameEn(s){
    return s.reportNameEn
  },
  getReportInd(s){
    return s.indEditReport
  },
  getUserToken(s){
    return s.isAuth
  },
  getLoginData(s){
    return s.loginData
  },
  getLoadData(s){
    return s.isLoadData
  },
  getAxiosWithToken(s){
    const AxiosTooken = Axios.create({
      headers: { 'Authorization': s.cookie.token },
      baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
    });
    return AxiosTooken
  }
}

export const actions = {
  async fetchPersonData({commit, getters}){
    console.log('/user/');
    const axios = getters.getAxiosWithToken
    await axios.get('/user/')
      .then( res => {
        commit('setPersonData', res.data)
        commit('setPersonAboutMe', {aboutMe: res.data.aboutMe, locale:'ru'})
        commit('setPersonAboutMe', {aboutMe: res.data.aboutMeEn, locale:'en'})
        commit('setEmailСonfirm', res.data.isEmailConfirmed)
        commit('setImgSrc', res.data.avatar)
      })
      .catch(error => console.log(error.response.data));
  },
  async fetchPersonReports({commit, getters}){
    const axios = getters.getAxiosWithToken
    await axios.get('/reports').
      then( res => {
        commit('setReportList', res.data)
        commit('setFileNameReportList', res.data)
      })
  },
  async addReportBD({getters,commit}, {report}){
    const axios = getters.getAxiosWithToken
    let rep = await axios.post('/reports', report)
    commit('setAddReportID', rep.data)
  },
  async editReportBD({getters}, {report}){
    const axios = getters.getAxiosWithToken
    let id = getters.getReportList[getters.getReportInd].id
    
    await axios.put('/reports/'+id, report)
  },
  async sevePersonAboutMeBD({getters}, aboutData){
    const axios = getters.getAxiosWithToken
    await axios.put('/user/', aboutData)
  },
  async sevePersonDataBD({getters}, personData){
    const axios = getters.getAxiosWithToken
    await axios.put('/user/', personData)
  },
}
