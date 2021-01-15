export const state = () => ({
  personData:{},
  personAboutMeRu:'',
  personAboutMeEn:'',
})

export const mutations = {
  setPersonData(state, userData){
    state.personData = userData
  },
  setPersonAboutMe(state, data){
    console.log(data);
    if(data.locale == 'ru'){
      state.personAboutMeRu = data.aboutMe
    }else{
      state.personAboutMeEn = data.aboutMe
    }

    console.log(state);
    
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
}

export const actions = {
  
}
export const modules = {
  
}