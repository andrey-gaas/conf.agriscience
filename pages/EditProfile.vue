<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="form grey lighten-5 d-flex justify-content-center rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="d-flex w-100" >

        <div class="step_wrp w-100" 
          
        >
          <form class="needs-validation" novalidate 
            @submit.prevent='formSubmit'
            @keypress.enter.prevent
          >
            <div class="teal lighten-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('editprofile_modifying_profile')}}</strong></h2>
            </div>
            <div class="pt-4 pb-4 px-4">
              <mdb-input class="my-0" size="sm"
                v-model="formSet.surname"
                :label="$t('reg_surname')"
                :wrapperClass="(this.$v.formSet.surname.$invalid && this.$v.formSet.surname.$dirty) ? 'invalid' : '' "
                
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.surname.alphaValid && this.$v.formSet.surname.$dirty)"
                >
                  {{$t('reg_surname_without_numbers_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.surname.required && this.$v.formSet.surname.$dirty)"
                >
                  {{$t('reg_empty_surname_field_error')}}
                </span>
              <mdb-input class="mt-4 mb-0 " size="sm" 
                :label="$t('reg_name')" 
                v-model="formSet.name"
                :wrapperClass="(this.$v.formSet.name.$invalid && this.$v.formSet.name.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.name.alphaValid && this.$v.formSet.name.$dirty)"
                >
                  {{$t('reg_name_without_numbers_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.name.required && this.$v.formSet.name.$dirty)"
                >
                  {{$t('reg_empty_name_field_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" size="sm"
                :label="$t('reg_patronymic')" 
                v-model="formSet.patronymic"
                :wrapperClass="(this.$v.formSet.patronymic.$invalid && this.$v.formSet.patronymic.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.patronymic.alphaValid && this.$v.formSet.patronymic.$dirty)"
                >
                  {{$t('reg_patronymic_without_numbers_error')}}
                </span>
                
              <mdb-input class="mt-4 mb-0" size="sm" 
                :label="$t('reg_organization')" 
                v-model="formSet.organization"
                :wrapperClass="(this.$v.formSet.organization.$invalid && this.$v.formSet.organization.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.organization.required && this.$v.formSet.organization.$dirty)"
                >
                  {{$t('reg_empty_organization_field_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" size="sm" 
                :label="$t('reg_position')" 
                v-model="formSet.position"
                :wrapperClass="(this.$v.formSet.position.$invalid && this.$v.formSet.position.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.position.required && this.$v.formSet.position.$dirty)"
                >
                  {{$t('reg_empty_position_field_error')}}
                </span>
              
              <mdb-input class="mt-4 mb-0" id='idPlace' size="sm"
                :label="$t('reg_country_city')"
                v-model="formSet.place"
                @blur="setPlase()"
                :wrapperClass="((this.$v.formSet.place.$invalid && this.$v.formSet.place.$dirty) || (!this.$v.formSet.locality.isBoolean && this.$v.formSet.locality.$dirty)) ? 'invalid' : '' "
                ref="suggest"
              />
              
                <span class="red-text"
                  v-if="(!this.$v.formSet.place.required && this.$v.formSet.place.$dirty)"
                >
                  {{$t('reg_empty_country_city_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.locality.isBoolean && this.$v.formSet.locality.$dirty)"
                >
                  {{$t('reg_invalid_country_city_field_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" size="sm" 
                :label="$t('reg_telephone')"
                v-model="formSet.telephone"
                :wrapperClass="(this.$v.formSet.telephone.$invalid && this.$v.formSet.telephone.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.telephone.required && this.$v.formSet.telephone.$dirty)"
                >
                  {{$t('reg_empty_telephone_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.telephone.phoneValid && this.$v.formSet.telephone.$dirty)"
                >
                  {{$t('reg_invalid_telephone_error')}}
                </span>
                <mdb-input type="textarea" 
                  :label="$t('editprofile_about_me')" 
                  :rows="5" 
                  v-model="aboutMe"
                />
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit"
                  :class="{'teal lighten-3':this.$v.formSet.$invalid , 'teal lighten-2':!this.$v.formSet.$invalid }"
                >{{$t('editprofile_save_changes')}}</mdb-btn>
                <nuxt-link :to="localeRout('/personarea')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
                >
                  {{$t('editprofile_cancel')}}
                </nuxt-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </mdb-container>
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout, transliterate} from '@/assets/utils'

import { loadYmap } from 'vue-yandex-maps'
import { helpers, required } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
//Валидатор истенности
const isBoolean = helpers.withParams(
  { type: 'isTrue' },
  v => v
)
//Валидатор телефона
const phoneValid = helpers.regex('alpha', /^\+?[0-9]{0,3}(\s|-| |\s|\(|\s\(|-\()?\d{3}(\s|-| |\s|\)|\)\s|\)\-)?(\d|\d\s|\d\-){3,8}$/)

export default {
  name: "Registration",
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data: () => ({
    step: 1,
    RU, EN,
    formSet:{ 
      surname: '',
      name: '',
      patronymic: '',
      organization: '',
      position: '',
      place: '',
      telephone: '',
      locality: '',
    },
    aboutMe:'',
    ymapSettings:{
      apiKey: '0b996b3e-08d1-4eb5-87dd-edff5bcbeff7',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1'
    },
  }),
  computed:{
    
  },
  validations:{
    formSet:{
      surname: {alphaValid, required},
      name: {alphaValid, required},
      patronymic: {alphaValid},
      organization: {required},
      position: {required},
      place: {required},
      telephone: {phoneValid, required},
      locality:{isBoolean}
    }
  },
  methods:{
    localeRout, transliterate, 
    async axiosTranslete(textData, {from, to}){
      let res = await this.$axios.post('/translate', {language: {from, to}, fields:textData})
      let result = {}
      let i = 0
      for(let key in textData){
        result[key] = res.data[i]
        i++
      }
      return result
    },
    async formSubmit(){
      await this.validYmap();
      this.$v.formSet.$touch()
      if(this.$v.formSet.$invalid){
        return
      }
      let personDataReg;
      
      if(this.$i18n.locale == 'en'){
        let dataTranslet = await this.axiosTranslete(
          {organization: this.formSet.organization, 
          position: this.formSet.position, 
          place: this.formSet.place,}, 
          {from:'en', to:'ru'})
        personDataReg = {
          surname: this.transliterate()(this.formSet.surname, true),
          surnameEn: this.formSet.surname,
          name: this.transliterate()(this.formSet.name, true),
          nameEn: this.formSet.name,
          patronymic: this.transliterate()(this.formSet.patronymic, true),
          patronymicEn: this.formSet.patronymic,
          organization: dataTranslet.organization,
          organizationEn: this.formSet.organization,
          position: dataTranslet.position,
          positionEn: this.formSet.position,
          place: dataTranslet.place,
          placeEn: this.formSet.place,
          telephone: this.formSet.telephone,
          aboutMeEn: this.aboutMe
        }
        
      }else{
        let dataTranslet = await this.axiosTranslete(
          {organization: this.formSet.organization, 
          position: this.formSet.position, 
          place: this.formSet.place,}, 
          {from:'ru', to:'en'})
        personDataReg = {
          surname: this.formSet.surname,
          surnameEn: this.transliterate()(this.formSet.surname),
          name: this.formSet.name,
          nameEn: this.transliterate()(this.formSet.name),
          patronymic: this.formSet.patronymic,
          patronymicEn: this.transliterate()(this.formSet.patronymic),
          organization: this.formSet.organization,
          organizationEn: dataTranslet.organization,
          position: this.formSet.position,
          positionEn: dataTranslet.position,
          place: this.formSet.place,
          placeEn: dataTranslet.place,
          telephone: this.formSet.telephone,
          aboutMe: this.aboutMe
        }
      }
      await this.$store.dispatch('sevePersonDataBD', personDataReg )
      await this.$store.commit('setPersonData', personDataReg);
      await this.$store.commit('setPersonAboutMe', {aboutMe:this.aboutMe, locale:this.$i18n.locale});
      this.$router.push(this.localeRout('/personarea'))
    },
    
    async validYmap(){
      let request = this.formSet.place
      try {
        await ymaps.geocode(request).then((res) => {
        try {
          let result = res.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData.kind')
          
          // locality - город
          // province - область/край
          // country - страна
          // house - дом 
          // street - улица
          if((result == 'country') || (result == 'province') || (result == 'hydro')){
            this.formSet.locality = false
            
            if(!(this.formSet.place.indexOf('Москва') == -1)) this.formSet.locality = true
          }else{
            this.formSet.locality = true
          }
        } catch (e) {
          this.formSet.locality = false
        }
      })
      } catch (error) {
        this.$v.formSet.place.$touch()
      }
    },
    ymapInit(){
      let input = this.$refs.suggest.$refs.input
      //Добовляем подсказки в инпут
      let suggestView = new ymaps.SuggestView(input)

      document.querySelector('#idPlace').parentNode.childNodes[2].addEventListener('click', this.setPlase)
    },
    setPlase(){
      this.formSet.place = this.$refs.suggest.$refs.input.value
      this.validYmap()
    }
  },
  async mounted(){
    //Загружаем данные
    
    if(this.$i18n.locale == 'ru'){
      this.formSet = {...this.formSet ,...this.$store.getters.getPersonData}
      this.aboutMe = this.$store.getters.getPersonAboutMeRu
    }else{
      this.formSet = {...this.formSet ,...this.$store.getters.getPersonDataEn}
      this.aboutMe = this.$store.getters.getPersonAboutMeEn
    }
    
    //Инициализируем лоадер яндекс карт
    await loadYmap({ ...this.ymapSettings, debug: true })
    ymaps.ready(this.ymapInit);
  },
  components:{
    mdbContainer, mdbInput, mdbBtn , mdbBtnGroup, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon
  }
};
</script>

<style lang="scss">
.md-form.invalid>{
  & input{
  box-shadow: 0 1px 0 0 red !important;
  border-bottom: 1px solid red !important;
    &:focus{
      &~label{
        color: #4285f4 !important;
      }
    }
  }
  & label{
    color: red !important;
  }
}

</style>