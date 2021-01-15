export const state = () => ({
  personData:{},
  personAboutMeRu:'',
  personAboutMeEn:'',
  speakerList:[
    {
      sulrname:'Нуждин',
      name:'Алесей',
      patronymic:'Иванович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'forsah34@gmail.com',
    },{
      sulrname:'Гаас',
      name:'Андрей',
      patronymic:'Хэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gaasы777@gmail.com',
    },{
      sulrname:'Наас',
      name:'Вндрей',
      patronymic:'Тэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gaaвs777@gmail.com',
    },{
      sulrname:'Иаас',
      name:'Ондрей',
      patronymic:'Ыэзэвович',
      position:'Программист',
      organization:'ГПТНБ',
      email:'gaaавs777@gmail.com',
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
  getSpicers(state){
    state.speakerList
  }
}

export const actions = {
  
}
export const modules = {
  
}