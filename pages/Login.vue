<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="form grey lighten-5 d-flex justify-content-center rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="d-flex w-100" >

        <div class="step_wrp w-100">
          <form
            class="needs-validation"
            novalidate
            @submit.prevent='formSubmit'
          >
            <div class="teal lighten-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('log_authorization')}}</strong></h2>
            </div>
            <div class="p-4">
              <mdb-input class="my-0" size="sm"
                :label="$t('reg_email')"
                v-model="formSet.email"
                name="username"
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
                name="password"
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
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit"
                  color='primary'
                >{{$t('log_login')}}</mdb-btn>
                <nuxt-link :to="localeRout('/registration')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
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


import { helpers, email, minLength, required } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn } from 'mdbvue';
//Валидатор пароля
const passwordValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ0-9_!@#$%^&*]*$/)


export default {
  name: "Login",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    formSet: {
      email: '',
      password: '',
    },
  }),
  validations:{
    formSet: {
      email: {email, required},
      password: {
        required,
        minLength: minLength(6),
        passwordValid,
      },
    },
  },
  methods:{
    localeRout,
    formSubmit(){
      this.$v.formSet.$touch();
      if(this.$v.formSet.$invalid){
        return;
      }
      this.$store.commit('toggleLoadData', false)
      this.$store.commit('setLoginData', this.formSet)
      this.$axios.post('/auth/login', { username: this.formSet.email, password: this.formSet.password }, { withCredentials: true })
        .then(res => {
          console.log('Success: ', res);
          const { message, token } = res.data;

          if (message === 'OK' && token) {
            this.$router.push(this.localeRout('/personarea'));
          }
        })
        .catch(error => {
          console.log('Error: ', error.message);
        });
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