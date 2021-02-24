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
            <mdb-input size="sm" m='y2'
              label="email" 
              v-model="editUser.email" 
            />
            <mdb-input size="sm" m='y2'
              label="Телефон" 
              v-model="editUser.telephone" 
            />
            <mdb-input size="sm" m='y2'
              v-if="this.todo === 'create'"
              label="Пароль" 
              v-model="password" 
            />
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
        console.log('hello');
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
      console.log('1');
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