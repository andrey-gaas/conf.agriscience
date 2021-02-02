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
              <h2 class="form__title mb-0  white-text"><strong>{{$t('reg_readerRegistrationCard')}}</strong></h2>
            </div>
            <div class="pt-4 pb-4 px-4">
              <mdb-input class="my-0" size="sm"
                v-model="formSet.surname"
                :label="$t('reg_surname')"
                @blur="saveInLocalStorage()"
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
                @blur="saveInLocalStorage()"
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
                @blur="saveInLocalStorage()"
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
                @blur="saveInLocalStorage()"
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
                @blur="saveInLocalStorage()"
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
                @blur="saveInLocalStorage(), setPlase()"
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
                @blur="saveInLocalStorage()"
                :wrapperClass="(this.$v.formSet.telephone.$invalid && this.$v.formSet.telephone.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.telephone.phoneValid && this.$v.formSet.telephone.$dirty)"
                >
                  {{$t('reg_invalid_telephone_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" type='email' size="sm" 
                :label="$t('reg_email')" 
                v-model="formSet.email" 
                @blur="saveInLocalStorage()"
                :wrapperClass="(this.$v.formSet.email.$invalid && this.$v.formSet.email.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.email.required && this.$v.formSet.email.$dirty)"
                >
                  {{$t('reg_empty_email_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.email.email && this.$v.formSet.email.$dirty)"
                >
                  {{$t('reg_invalid_email_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" type='password' size="sm"
                :label="$t('reg_password')" 
                v-model="formSet.password"
                :wrapperClass="(this.$v.formSet.password.$invalid && this.$v.formSet.password.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.password.required && this.$v.formSet.password.$dirty)"
                >
                  {{$t('reg_empty_password_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.password.minLength && this.$v.formSet.password.$dirty)"
                >
                  {{$tc('reg_length_password_error', 1, { count: $v.formSet.password.$params.minLength.min })}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.formSet.password.passwordValid && this.$v.formSet.password.$dirty)"
                >
                  {{$t('reg_invalid_password_error')}}
                </span>
              <div class="custom-control custom-checkbox mt-4 mb-0">
                <input type="checkbox" class="custom-control-input" id="defaultUnchecked" v-model="formSet.isConsent"
                  @blur="saveInLocalStorage()"
                >
                <label class="custom-control-label" for="defaultUnchecked">{{$t('reg_consent')}}</label>
              </div>
              <span class="red-text"
                v-if="(!this.$v.formSet.isConsent.isBoolean && this.$v.formSet.password.$dirty)"
              >
                {{$t('reg_consent_required')}}
              </span>
              <span class='d-flex mt-2 grey-text'>{{$t('reg_info_message')}}</span>
              <div>
                <mdb-btn class="mt-4 mb-0" type="submit"
                  :class="{'teal lighten-3':this.$v.formSet.$invalid , 'teal lighten-2':!this.$v.formSet.$invalid }"
                >{{$t('main_cardreg_register')}}</mdb-btn>
                <nuxt-link :to="localeRout('/login')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
                >
                  {{$t('log_login')}}
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
import { helpers, required, email, minLength } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
//Валидатор истенности
const isBoolean = helpers.withParams(
  { type: 'isTrue' },
  v => v
)
//Валидатор пароля
const passwordValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ0-9_!@#$%^&*]*$/)
const phoneValid = helpers.regex('alpha', /^\+?[0-9]{0,3}(\s|-| |\s|\(|\s\(|-\()?\d{3}(\s|-| |\s|\)|\)\s|\)\-)?(\d|\d\s|\d\-){3,8}$/)



export default {
  name: "Registration",
  layout: 'EmptyLayout',
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
      email: '',
      telephone: '',
      password: '',
      isConsent: '',
      locality: '',
    },
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
      email: {email, required},
      telephone: {phoneValid},
      password: {
        required,
        minLength: minLength(6),
        passwordValid
      },
      isConsent:{isBoolean},
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
      this.clearLacalStorage()

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
          email: this.formSet.email,
          telephone: this.formSet.telephone,
          password: this.formSet.password,
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
          email: this.formSet.email,
          telephone: this.formSet.telephone,
          password: this.formSet.password,
        }
      }

      await this.$axios.post('/auth/registration', personDataReg)
        .then(res => {
          const { message, token } = res.data;
          if (res.data.message === 'OK') {
            this.$cookies.set('token', token, { maxAge: 60 * 60 * 24 * 7 });
            this.$store.commit('setPersonData', personDataReg);
            this.$router.push(this.localeRout('/PersonArea'));
          }
        })
        .catch(error => console.log(error));
    },
    saveInLocalStorage(){
      //Сохроняем данные в localStorage,
      //Чтобы не потерять их если что-то пойдёт не так
      localStorage.formSet = JSON.stringify(this.formSet)
    },
    clearLacalStorage(){
      localStorage.formSet = ''
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
    //Загружаем сохраннёные введёны данные
    if(localStorage.formSet) this.formSet = JSON.parse(localStorage.formSet)
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