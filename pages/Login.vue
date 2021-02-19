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
                v-model="email"
                name="username"
              />
                <span class="red-text"
                  v-if="(!this.$v.email.required && this.$v.email.$dirty)"
                >
                  {{$t('reg_empty_email_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.email.email && this.$v.email.$dirty)"
                >
                  {{$t('reg_invalid_email_error')}}
                </span>
              <mdb-input class="mt-4 mb-0" type='password' size="sm"
                :label="$t('reg_password')"
                v-model="password"
                name="password"
              />
                <span class="red-text d-flex"
                  v-if="(!this.$v.password.required && this.$v.password.$dirty)"
                >
                  {{$t('reg_empty_password_field_error')}}
                </span>
                <span class="red-text d-flex"
                  v-else-if="(!this.$v.password.minLength && this.$v.password.$dirty)"
                >
                  {{$tc('reg_length_password_error', 1, { count: $v.password.$params.minLength.min })}}
                </span>
                <span class="red-text d-flex"
                  v-else-if="(!this.$v.password.passwordValid && this.$v.password.$dirty)"
                >
                  {{$t('reg_invalid_password_error')}}
                </span>
                <span class="red-text d-flex"
                  v-if="(error == 401)"
                >
                  {{$t('log_error_login_or_password')}}
                </span>
                <nuxt-link :to="localeRout('/NewPassword')">{{$t('log_forgot_password')}}</nuxt-link>
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit"
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
    email: '',
    password: '',
    error: '',
  }),
  validations:{
    email: {email, required},
    password: {
      required,
      minLength: minLength(6),
      passwordValid,
    },
  },
  watch:{
    password(){ this.error = ''},
    email(){ this.error = ''},
  },
  methods:{
    localeRout,
    formSubmit(){
      this.$v.$touch();
      if(this.$v.$invalid){
        return;
      }
      this.$store.commit('toggleLoadData', false)
      this.$store.commit('setLoginData', {email: this.email, password: this.password})
      this.$axios.post('/auth/login', { username: this.email, password: this.password })
        .then(res => {
          //console.log('Success: ', res);
          const { message, token } = res.data;

          if (message === 'OK' && token) {
            this.$cookies.set('token', token, { maxAge: 60 * 60 * 24 * 7 });
            this.$store.commit('setIsAuth', true)
            this.$router.push(this.localeRout('/personarea'));
          }
        })
        .catch((error) => {
          this.$store.commit('setIsAuth', false)
          this.error = error.message.slice(-3)
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