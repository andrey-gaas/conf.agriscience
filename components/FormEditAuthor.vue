<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="form grey lighten-5 d-flex justify-content-center rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="d-flex w-100" >

        <div class="step_wrp w-100" 
          
        >
          <form class="needs-validation" novalidate 
            @submit.prevent='formSubmit'
          >
            <div class="teal lighten-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('edit_author_speaker')}}</strong></h2>
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
                  {{$t('edit_author_enter_surname')}}
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
                  {{$t('edit_author_enter_name')}}
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
              />
              <mdb-input class="mt-4 mb-0" size="sm" 
                :label="$t('reg_position')" 
                v-model="formSet.position"
              />
              <mdb-input class="mt-4 mb-0" type='email' size="sm" 
                :label="$t('reg_email')" 
                v-model="formSet.email"
                :wrapperClass="(this.$v.formSet.email.$invalid && this.$v.formSet.email.$dirty) ? 'invalid' : '' "
              />
                <span class="red-text"
                  v-if="(!this.$v.formSet.email.email && this.$v.formSet.email.$dirty)"
                >
                  {{$t('reg_invalid_email_error')}}
                </span>
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit"
                  :class="{'btn-light-blue':this.$v.formSet.$invalid , 'btn-primary':!this.$v.formSet.$invalid }"
                >{{textBtn}}</mdb-btn>
                <mdb-btn
                  class="mt-4 mb-0 teal lighten-2"
                  @click="closeEdit"
                >
                  {{$t('edit_author_cancel')}}
                </mdb-btn>
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

import { helpers, required, email, } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
//Валидатор истенности


export default {
  name: "Registration",
  layout: 'EmptyLayout',
  props: ['editAuthor','closeEdit','textBtn', 'loc'],
  data: () => ({
    step: 1,
    RU, EN,
    formSet:{ 
      surname: '',
      name: '',
      patronymic: '',
      organization: '',
      position: '',
      email: '',
    },
  }),
  computed:{
    
  },
  validations:{
    formSet:{
      surname: {alphaValid, required},
      name: {alphaValid, required},
      patronymic: {alphaValid},
      email: {email},
    }
  },
  methods:{
    localeRout,transliterate,
    localize(speaker){
      
      let speakerData = {...speaker}
      if(this.loc == 'ru'){
        for(let el in speakerData){
          if( (el == 'surname') || (el == 'name') || (el == 'patronymic')){
            speakerData[el] = this.transliterate()(speakerData[el])
          } 
        }
      }else{
        for(let el in speakerData){
          if( (el == 'surname') || (el == 'name') || (el == 'patronymic')){
            speakerData[el] = this.transliterate()(speakerData[el], true)
          } 
        }
      }
      
      return speakerData
    },
    formSubmit(){
      this.$v.formSet.$touch()
      if(this.$v.formSet.$invalid){
        return
      }

      let enPerson, ruPerson;

      if(this.loc == 'ru'){
        ruPerson = this.formSet
        enPerson = this.localize({...ruPerson})
      }else{
        enPerson = this.formSet
        ruPerson = this.localize({...enPerson})
      }

      if(this.formSet.num != undefined){
        
        this.$store.commit('setSpeaker', {speaker: ruPerson, ind: this.formSet.num})
        this.$store.commit('setSpeakerEn', {speaker: enPerson, ind: this.formSet.num})
        
      }else{
        this.$store.commit('addSpeaker', {speakerPerson:ruPerson, speakerPersonEn:enPerson})
      }
      this.closeEdit()
    },
    
  },
  mounted(){
    
  },
  created(){
    this.formSet = {...this.editAuthor}
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

.wrap__edit-author{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  
  background-color: rgba(0, 0, 0, 0.7);
}

</style>