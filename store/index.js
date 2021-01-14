export const state = () => ({
  personData:{},
})

export const mutations = {
  setPersonData(state, userData){
    state.personData = userData
  },
}

export const getters = {
  getPersonData(state){
    return state.personData
  }
}

export const actions = {
  
}
export const modules = {
  
}