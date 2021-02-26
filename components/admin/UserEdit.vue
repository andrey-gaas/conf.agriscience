<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="grey user-edit__conteiner lighten-5 d-flex justify-content-center flex-column rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="overflow-y-auto overflow-x-hidden">
        <mdb-row p='3'>
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='y2'
              label="Фамилия" 
              v-model="editUser.surname" 
            />
            <mdb-input size="sm" m='y2'
              label="Имя" 
              v-model="editUser.name" 
            />
            <mdb-input size="sm" m='y2'
              label="Отчество" 
              v-model="editUser.patronymic" 
            />
            <mdb-input size="sm" m='y2'
              label="Организация" 
              v-model="editUser.organization" 
            />
            <mdb-input size="sm" m='y2'
              label="Должность" 
              v-model="editUser.position" 
            />
            <mdb-input size="sm" m='y2'
              label="Город, страна" 
              v-model="editUser.place" 
            />
            <mdb-input type="textarea" label="О себе" :rows="5"
              v-model="editUser.aboutMe"
            />
            <mdb-btn class="teal lighten-2 m-0" @click="translateUser({from:'ru', to:'en'})">
              Перевести на английский
            </mdb-btn>
          </mdb-col>
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='y2'
              label="Surname" 
              v-model="editUser.surnameEn" 
            />
            <mdb-input size="sm" m='y2'
              label="Name" 
              v-model="editUser.nameEn" 
            />
            <mdb-input size="sm" m='y2'
              label="Middle name" 
              v-model="editUser.patronymicEn" 
            />
            <mdb-input size="sm" m='y2'
              label="Organization" 
              v-model="editUser.organizationEn" 
            />
            <mdb-input size="sm" m='y2'
              label="Position" 
              v-model="editUser.positionEn" 
            />
            <mdb-input size="sm" m='y2'
              label="City, country" 
              v-model="editUser.placeEn" 
            />
            <mdb-input type="textarea" label="About me" :rows="5"
              v-model="editUser.aboutMeEn"
            />
            <mdb-btn class="teal lighten-2 m-0" @click="translateUser({from:'en', to:'ru'})">
              Translate on Russian
            </mdb-btn>
          </mdb-col>
          <!--  -->
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='t3 b0'
              v-if="todo === 'create'"
              label="email" 
              v-model="editUser.email" 
            />
            <mdb-input size="sm" m='t3 b0'
              label="Телефон" 
              v-model="editUser.telephone" 
            />
            <mdb-input size="sm" m='t3 b0'
              v-if="this.todo === 'create'"
              label="Пароль" 
              v-model="password" 
            />
            <span class="d-flex my-2"
              v-if="todo === 'edit'"
            >E-mail: {{editUser.email}}</span>
            <div class="custom-control custom-checkbox"
              v-if="todo === 'create'"
            >
              <input type="checkbox" class="custom-control-input" id="EmailConfirmed"
                v-model="editUser.isSendLetter"
              >
              <label class="custom-control-label" for="EmailConfirmed">Отправить письмо для подтверждения почты</label>
            </div>
            <div class="custom-control custom-checkbox"
              v-if="todo === 'edit'"
            >
              <input type="checkbox" class="custom-control-input" id="EmailConfirmed"
                v-model="editUser.isEmailConfirmed"
              >
              <label class="custom-control-label" for="EmailConfirmed">Почта подтверждена</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="isUserConfirm"
                v-model="editUser.isUserChecked"
              >
              <label class="custom-control-label" for="isUserConfirm">Пользователь проверен</label>
            </div>
            <span class="d-flex red-text" v-if="$v.editUser.$invalid && $v.editUser.$dirty">
              Ошибка в заполнении полей:
              {{$v.editUser.surname.$invalid? 'Фамилия, ': ''}}
              {{$v.editUser.surnameEn.$invalid? 'Surname, ': ''}}
              {{$v.editUser.name.$invalid? 'Имя, ': ''}}
              {{$v.editUser.nameEn.$invalid? 'Name, ': ''}}
              {{$v.editUser.patronymic.$invalid? 'Отчество, ': ''}}
              {{$v.editUser.patronymicEn.$invalid? 'Middle name, ': ''}}
              {{$v.editUser.organization.$invalid? 'Организация, ': ''}}
              {{$v.editUser.organizationEn.$invalid? 'Organization, ': ''}}
              {{$v.editUser.place.$invalid? 'Должность, ': ''}}
              {{$v.editUser.placeEn.$invalid? 'Place, ': ''}}
              {{$v.editUser.email.$invalid? 'E-mail, ': ''}}
              {{$v.editUser.telephone.$invalid? 'Телефон, ': ''}}
              {{$v.password.$invalid? 'Пароль, ': ''}}
            </span>
          </mdb-col>
          <!--  -->
        </mdb-row>
        
        <mdb-row>
          <mdb-col>
            <mdb-btn @click="saveUser">
              Cохранить
            </mdb-btn>
            <mdb-btn @click="userIsChecked"  v-if="todo !== 'create'">
              Проверен
            </mdb-btn>
            <mdb-btn @click="closeForm">
              Отмена
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-container>
  </div>
</template>

<script>


import { RU, EN } from '@/constants/language';
import { transliterate} from '@/assets/utils'

import { helpers, required, email, minLength} from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbRow, mdbCol } from 'mdbvue';

//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
//Валидатор телефона
const phoneValid = helpers.regex('alpha', /^\+?[0-9]{0,3}(\s|-| |\s|\(|\s\(|-\()?\d{3}(\s|-| |\s|\)|\)\s|\)\-)?(\d|\d\s|\d\-){3,8}$/)
//Валидатор пароля
const passwordValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ0-9_!@#$%^&*]*$/)

export default {
  props:['closeForm','user','todo', 'userRows', 'appDataUserRows'],
  data: () => ({
    RU, EN,
    editUser:{isUserChecked : false},
    password: '',
    XSquareFill:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="x square fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-x-square-fill report__status_icon red-text b-icon bi"><g data-v-2730f04a=""><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path></g></svg>',
    CheckSquare:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-check-square report__status_icon green-text b-icon bi"><g data-v-2730f04a=""><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path></g></svg>',
  }),
  computed:{
    
  },
  validations:{
    editUser:{
      surname: {alphaValid, required},
      surnameEn: {alphaValid, required},
      name: {alphaValid, required},
      nameEn: {alphaValid, required},
      patronymic: {alphaValid},
      patronymicEn: {alphaValid},
      organization: {required},
      organizationEn: {required},
      position: {required},
      positionEn: {required},
      place: {required},
      placeEn: {required},
      email: {email, required},
      telephone: {phoneValid},
    },
    password:{ passwordValid, minLength:minLength(6), required }
  },
  methods:{
    transliterate,
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
    async translateUser({from, to}){
      if(to === 'en'){
        let dataTranslate = await this.axiosTranslete({
          organizationEn: this.editUser.organization? this.editUser.organization: '',
          positionEn: this.editUser.position? this.editUser.position: '',
          placeEn: this.editUser.place? this.editUser.place: '',
          aboutMeEn: this.editUser.aboutMe? this.editUser.aboutMe: '',
        }, {from, to})
        
        this.editUser.surnameEn = this.transliterate()(this.editUser.surname? this.editUser.surname: '')
        this.editUser.nameEn = this.transliterate()(this.editUser.name? this.editUser.name: '')
        this.editUser.patronymicEn = this.transliterate()(this.editUser.patronymic? this.editUser.patronymic: '')
        this.editUser.organizationEn = dataTranslate.organizationEn
        this.editUser.positionEn = dataTranslate.positionEn
        this.editUser.placeEn = dataTranslate.placeEn
        this.editUser.aboutMeEn = dataTranslate.aboutMeEn
      }
      if(to === 'ru'){
        let dataTranslate = await this.axiosTranslete({
          organization: this.editUser.organizationEn? this.editUser.organizationEn: '',
          position: this.editUser.positionEn? this.editUser.positionEn: '',
          place: this.editUser.placeEn? this.editUser.placeEn: '',
          aboutMe: this.editUser.aboutMeEn? this.editUser.aboutMeEn: '',
        }, {from, to})
        
        this.editUser.surname = this.transliterate()(this.editUser.surnameEn? this.editUser.surnameEn: '', true)
        this.editUser.name = this.transliterate()(this.editUser.nameEn? this.editUser.nameEn: '', true)
        this.editUser.patronymic = this.transliterate()(this.editUser.patronymicEn? this.editUser.patronymicEn: '', true)
        this.editUser.organization = dataTranslate.organization
        this.editUser.position = dataTranslate.position
        this.editUser.place = dataTranslate.place
        this.editUser.aboutMe = dataTranslate.aboutMe
      }
    },
    async saveUser(){
      this.$v.editUser.$touch()
      if(this.$v.editUser.$invalid) return
      if(this.todo === 'edit'){
        await this.$store.dispatch('admin/saveUserEditBD', this.editUser)
        this.appDataUserRows(this.editUser, this.$store.getters['admin/getUsersEdit'].id)
        this.closeForm()
        return
      }
      if(this.todo === 'create'){
        this.$v.password.$touch()
        if(this.$v.password.$invalid) return 

        this.editUser.password = this.password

        await this.$store.dispatch('admin/createUserBD', this.editUser)
        let id  = this.userRows[this.userRows.length - 1].id + 1
        let itemArr = {
          id,
          name: `${this.editUser.surname} ${this.editUser.name?this.editUser.name[0]+'.':''} ${this.editUser.patronymic?this.editUser.patronymic[0]+'.':''}`,
          email: this.editUser.email,
          isEmailChecked: this.editUser.isEmailConfirmed ? this.CheckSquare : this.XSquareFill,
          isUserChecked: this.editUser.isUserChecked ? this.CheckSquare : this.XSquareFill,
          open: `<button data-v-bc7807ae="" type="button" onclick="window.$nuxt.$children[2].$children[1].$children[0].startEditUsers(${id})" class="btn btn-default btn-sm ripple-parent m-0" data-v-2730f04a="">Откр</button>`,
        }
        this.$set(this.userRows, this.userRows.length, itemArr)
        this.closeForm()
      }
    },
    async userIsChecked(){
      this.editUser.isUserChecked = true
      await this.$store.dispatch('admin/userIsChecked')
      this.appDataUserRows(this.editUser, this.$store.getters['admin/getUsersEdit'].id)
      this.closeForm()
    },
  },
  mounted(){
    
  },
  created(){
    const {
      email,isEmailConfirmed, name, nameEn,organization,
      organizationEn, patronymic, patronymicEn, place,placeEn,
      position,positionEn,surname, surnameEn, telephone, isUserChecked,
    } = this.user
    this.editUser = {
      isUserChecked : isUserChecked ? isUserChecked: false,
      email, isEmailConfirmed,name, nameEn,organization,
      organizationEn,patronymic,patronymicEn,place,placeEn,position,
      positionEn,surname,surnameEn,telephone,
    }
  },
  components:{
    mdbContainer, mdbInput, mdbBtn , mdbBtnGroup, mdbRow, mdbCol
  }
};
</script>

<style lang="scss">
.wrap__edit-author{
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  min-height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
}
.user-edit__conteiner{
  max-height: 90vh;
  overflow-y: auto !important;
}
.h1000{
  height: 1000px;
  width: 100%;
  background-color: red;
}
</style>