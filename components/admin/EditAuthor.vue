<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="grey lighten-5 overflow-hidden" p="3" m='t5'>
      <mdb-row class='w-100 mx-0 pt-2' >
        <mdb-col sm='12' md='6'>
          <mdb-input class="my-0" size="sm"
            v-for="(item, key) in editAuthor.ru" :key="key"
            v-model="editAuthor.ru[key]"
            :label="ruText[key]"
          />
          <mdb-btn
            @click="localize('ru')"
          >
            Перевести на Aнглийский
          </mdb-btn>
        </mdb-col>
        <mdb-col sm='12' md='6'>
          <mdb-input class="my-0" size="sm"
            v-for="(item, key) in editAuthor.ru" :key="key"
            v-model="editAuthor.en[key]"
            :label="enText[key]"
          />
          <mdb-btn
            @click="localize('en')"
          >
            Translate to Russian
          </mdb-btn>
        </mdb-col>
        <mdb-col col="12">
          <mdb-input class="mb-0" size="sm"
            v-model="editAuthor.email"
            :label="'Почта'"
          />
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="isSpeaker"
              v-model="editAuthor.isSpeaker"
            >
            <label class="custom-control-label" for="isSpeaker">Докладчик</label>
          </div>
        </mdb-col>
        <span class="d-flex red-text" v-if="$v.editAuthor.$invalid && $v.editAuthor.$dirty">
          Ошибка в заполнении полей
          {{$v.editAuthor.ru.surname.$invalid? 'Фамилия, ': ''}}
          {{$v.editAuthor.ru.name.$invalid? 'Имя, ': ''}}
          {{$v.editAuthor.en.surname.$invalid? 'Surname, ': ''}}
          {{$v.editAuthor.en.surname.$invalid? 'Name, ': ''}}
          {{$v.editAuthor.email.$invalid ? 'E-mail': ''}}
        </span>
      </mdb-row>
      <div>
          <mdb-btn class="mt-4 mb-0 teal lighten-2" @click="saveAuthor"
          >Сохранить</mdb-btn>
          <mdb-btn
            class="mt-4 mb-0 teal lighten-2"
            @click="closeForm()"
          >
            {{$t('edit_author_cancel')}}
          </mdb-btn>
      </div>
    </mdb-container>
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout, transliterate} from '@/assets/utils'

import { helpers, required, email, } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbRow, mdbCol } from 'mdbvue';
//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)

export default {
  name: "EditAuthor",
  props: ['editAuthor','closeForm','reportEdit','setAuthor'],
  data: () => ({
    RU, EN,
    ruText:{
      surname:'Фамилия',
      name:'Имя',
      patronymic:'Отчество',
      position:'Должность',
      organization:'Организация',
    },
    enText:{
      surname:'Surname',
      name:'Name',
      patronymic:'Middle name',
      position:'Position',
      organization:'Organization',
    },
  }),
  computed:{
    
  },
  validations:{
    editAuthor:{
      ru:{
        surname: {alphaValid, required},
        name: {alphaValid, required},
        patronymic: {alphaValid},
      },
      en:{
        surname: {alphaValid, required},
        name: {alphaValid, required},
        patronymic: {alphaValid},
      },
      email: {email},
    }
  },
  methods:{
    localeRout,transliterate,
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
    async localize(loc){
      let dataRu = this.editAuthor.ru
      let dataEn = this.editAuthor.en
      let res
      if(loc === 'ru'){
        res = await this.axiosTranslete({position:dataRu.position? dataRu.position: '', organization:dataRu.organization? dataRu.organization: ''}, {from:'ru', to:'en'});
        dataEn = {
          surname: this.transliterate()(dataRu.surname? dataRu.surname: ''),
          name: this.transliterate()(dataRu.name? dataRu.name: ''),
          patronymic: this.transliterate()(dataRu.patronymic? dataRu.patronymic: ''),
          organization: res.organization,
          position: res.position,
        }
        this.editAuthor.en = dataEn
      }else{
        res = await this.axiosTranslete({position:dataEn.position? dataEn.position: '', organization:dataEn.organization? dataEn.organization: ''}, {from:'en', to:'ru'});
        dataRu = {
          surname: this.transliterate()(dataEn.surname? dataEn.surname: '', true),
          name: this.transliterate()(dataEn.name? dataEn.name: '', true),
          patronymic: this.transliterate()(dataEn.patronymic? dataEn.patronymic: '', true),
          organization: res.organization,
          position: res.position,
        }
        this.editAuthor.ru = dataRu
      }
    },
    saveAuthor(){
      this.$v.editAuthor.$touch()

      if(this.$v.editAuthor.$invalid) return
      
      let num = this.editAuthor.num
      let email = this.editAuthor.email
      let speakerRu = {...this.editAuthor.ru, isSpeaker: this.editAuthor.isSpeaker, email, num}
      let speakerEn = {...this.editAuthor.en, isSpeaker: this.editAuthor.isSpeaker, email, num}
      if(num === this.reportEdit.speakerList.length){
        this.reportEdit.speakerList.push(speakerRu)
        this.reportEdit.speakerListEn.push(speakerEn)
      }else{
        this.reportEdit.speakerList[num] = speakerRu
        this.reportEdit.speakerListEn[num] = speakerEn
      }
      this.setAuthor()
      this.closeForm()
    }
  },
  mounted(){
  },
  created(){
  },
  components:{
    mdbContainer, mdbInput, mdbBtn , mdbBtnGroup, mdbRow, mdbCol
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

.wrap__edit-author{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  
  background-color: rgba(0, 0, 0, 0.7);
}

</style>