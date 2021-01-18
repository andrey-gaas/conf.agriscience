export const state = () => ({
  personData:{},
  personAboutMeRu:'',
  personAboutMeEn:'',
  speakerList:[
    {
      surname:'Нуждин',
      name:'Алесей',
      patronymic:'Иванович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'forsah34@gmail.com',
      num: 0,
      isSpeaker: false,
    },{
      surname:'Гаас',
      name:'Андрей',
      patronymic:'Хэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gaa777@gmail.com',
      num: 1,
      isSpeaker: true,
    },{
      surname:'Наас',
      name:'Вндрей',
      patronymic:'Тэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gaas777@gmail.com',
      num: 2,
      isSpeaker: false,
    },{
      surname:'Иаас',
      name:'Ондрей',
      patronymic:'Ыэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gs777@gmail.com',
      num: 3,
      isSpeaker: false,
    },
  ],
})

export const mutations = {
  setPersonData(state, userData){
    state.personData = userData
  },
  setPersonAboutMe(state, data){
    if(data.locale == 'ru'){
      state.personAboutMeRu = data.aboutMe
    }else{
      state.personAboutMeEn = data.aboutMe
    }
  },
  
  upSpeaker(state, ind){
    if(ind == 0) return
      const el = {...state.speakerList[ind], num: ind-1}
      state.speakerList[ind-1].num = ind
      state.speakerList.splice(ind-1, 0, el)
      state.speakerList.splice(ind+1, 1)
      console.log(state.speakerList);
  },
  downSpeaker(state, ind){
    if(ind == state.speakerList.length-1) return
      const el = {...state.speakerList[ind], num: ind+1}
      state.speakerList[ind+1].num = ind
      state.speakerList.splice(ind+2, 0, el)
      state.speakerList.splice(ind, 1)
      console.log(state.speakerList);
  },
  setSpeaker(state, {speaker, ind}){
    state.speakerList[ind] = speaker
    state.speakerList.push('1')
    state.speakerList.pop()
  },
  addSpeaker(state, speaker){
    speaker.num = state.speakerList.length
    state.speakerList.push(speaker)
  },
  deletSpeaker(state, ind){
    state.speakerList.splice(ind, 1)
  }
}

export const getters = {
  getPersonData(state){
    return state.personData
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
}

export const actions = {
  //npm
}
export const modules = {
  
}