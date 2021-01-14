<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="form grey lighten-5 d-flex justify-content-center rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="d-flex w-100" >

        <div class="step_wrp w-100"      
        >
          <form class="needs-validation" novalidate
            @submit.prevent='formSubmit'
          >
            <div class="blue darken-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('log_authorization')}}</strong></h2>
            </div>
            <div class="p-4">
              <mdb-input class="my-0" size="sm"
                :label="$t('reg_email')"
              />
              <mdb-input class="mt-4 mb-0" type='password' size="sm"
                :label="$t('reg_password')" 
              />
              <div>
                <mdb-btn class="mt-4 mb-0" type="submit"
                  color='primary'
                >{{$t('log_login')}}</mdb-btn>
                <nuxt-link :to="localeRout('/registration')" 
                  class="mt-4 mb-0 btn btn-primary text-decoration-none ripple-parent btn-outline-primary text-white"
                >
                  {{$t('log_reg')}}
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
import {localeRout} from '@/assets/utils'

import { helpers } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn } from 'mdbvue';
//Валидатор для русского алфавита
const alphaValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ]*$/)
//Валидатор истенности
const isBoolean = helpers.withParams(
  { type: 'isTrue' },
  v => v
)
//Валидатор пароля
const passwordValid = helpers.regex('alpha', /^[a-zA-Z0-9]*$/)


export default {
  name: "Login",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,

  }),
  computed:{
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    formSubmit(){
      console.log('LOGIN');
    },
  },
  components:{
    mdbContainer, mdbInput,  mdbBtn
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