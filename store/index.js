export const state = () => ({
  personData:{},
  personDataEn:{},
  personAboutMeRu:'',
  personAboutMeEn:'',
  speakerList:[
  ],
  speakerListEn:[
  ],
  reportText:'',
  reportName:'',
  reportTextEn:'',
  reportNameEn:'',
  indEditReport: 0,
  reportList:[
    { title:'Доклад',
      annotations: 'Небольшая аннотация',
      status: 1,
      speakerList:[
        {
          surname:"Нуждин",
          name:'Алексей',
          patronymic:'Иванвоич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'forsdsf@gsd.ru',
          num: 0,
          isSpeaker: false,
        },{
          surname:"Гаас",
          name:'Андрей',
          patronymic:'Николяевич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'gaas@gsd.ru',
          num: 1,
          isSpeaker: true,
        },
      ]
    }, { 
      title:'Доклад2',
      annotations: 'Небольшая аннотация2',
      status: 0,
      speakerList:[
        {
          surname:"Ндин",
          name:'Аксей',
          patronymic:'анвоич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'forsdsf@gsd.ru',
          num: 0,
          isSpeaker: true,
        },{
          surname:"Гс",
          name:'Анй',
          patronymic:'Ниевич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'gaas@gsd.ru',
          num: 1,
          isSpeaker: false,
        },
      ]
    }
  ],
  reportListEn:[
    { title:'Report',
      annotations: 'Small anotation',
      status: 1,
      speakerList:[
        {
          surname:"Nuzhdin",
          name:'Alexei',
          patronymic:'Иванвоич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'forsdsf@gsd.ru',
          num: 0,
          isSpeaker: false,
        },{
          surname:"Gaas",
          name:'Andrei',
          patronymic:'Николяевич',
          position:'Программист',
          organization:'ГПНТБ',
          email:'gaas@gsd.ru',
          num: 1,
          isSpeaker: true,
        },
      ]
    }, { 
      title:'Report2',
      annotations: 'Small anotation2',
      status: 0,
      speakerList:[
        {
          surname:"Ndin",
          name:'alexei',
          patronymic:'anovich',
          position:'Программист',
          organization:'ГПНТБ',
          email:'forsdsf@gsd.ru',
          num: 0,
          isSpeaker: true,
        },{
          surname:"Gs",
          name:'Ani',
          patronymic:'Neivich',
          position:'Программист',
          organization:'ГПНТБ',
          email:'gaas@gsd.ru',
          num: 1,
          isSpeaker: false,
        },
      ]
  }
  ]
})

export const mutations = {
  setEditReport(s, ind){
    
    let editReport,
        editReportEn;
    if(!s.reportList[ind]){
      editReport = { 
        title:'',
        annotations: '',
        status: 0,
        speakerList:[]
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
    

  },
  setPersonData(state, userData){
    state.personData = userData
  },
  setPersonDataEn(state, userData){
    state.personDataEn = userData
  },
  setIndReport(state, ind){
    state.indEditReport = ind
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
    state.reportList.splice(ind, 1, report)
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
    console.log(state.speakerList[ind].isSpeaker,state.speakerListEn[ind].isSpeaker);
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
  }
}

export const getters = {
  getPersonData(state){
    return state.personData
  },
  getPersonDataEn(state){
    return state.personDataEn
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
  getSpeakersEn(state){
    return state.speakerListEn
  },
  getReportList(state){
    return state.reportList
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
}

export const actions = {
  
}
export const modules = {
  
}