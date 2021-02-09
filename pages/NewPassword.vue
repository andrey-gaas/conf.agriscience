<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="form grey lighten-5 d-flex justify-content-center rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="d-flex w-100" >

        <div class="step_wrp w-100"
          v-if="step == 1"
        >
          <form
            class="needs-validation"
            novalidate
            @submit.prevent='stepOne'
          >
            <div class="teal lighten-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('new_password_recovery_password')}}</strong></h2>
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
                <span
                  class="red-text"
                  v-if="error != ''"
                >{{error}}</span>
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit">
                  {{$t('new_password_reestablish')}}
                </mdb-btn>
                <nuxt-link :to="localeRout('/login')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
                >
                  {{$t('edit_report_cancel')}}
                </nuxt-link>
              </div>
            </div>
          </form>
        </div>
        <div class="step_wrp w-100"
          v-if="step == 2"
        >
          <form
            class="needs-validation"
            novalidate
            @submit.prevent='stepTwo'
          >
            <div class="teal lighten-1 px-4 py-3">
              <h2 class="form__title mb-0  white-text"><strong>{{$t('new_password_recovery_password')}}</strong></h2>
            </div>
            <div class="p-4">
              <span class="d-flex h6">{{$t('new_password_message')}}</span>
              <mdb-input class="my-0" size="sm"
                :label="$t('new_password_code')"
                v-model="code"
                name="code"
              />
              <mdb-input class="my-0" size="sm"
                :label="$t('reg_password')"
                v-model="password"
                name="password"
              />
                <span class="red-text"
                  v-if="(!this.$v.password.required && this.$v.password.$dirty)"
                >
                  {{$t('reg_empty_password_field_error')}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.password.minLength && this.$v.password.$dirty)"
                >
                  {{$tc('reg_length_password_error', 1, { count: $v.password.$params.minLength.min })}}
                </span>
                <span class="red-text"
                  v-else-if="(!this.$v.password.passwordValid && this.$v.password.$dirty)"
                >
                  {{$t('reg_invalid_password_error')}}
                </span>
                <span
                  class="red-text"
                  v-if="error != ''"
                >{{error}}</span>
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit">
                  {{$t('edit_report_save')}}
                </mdb-btn>
                <nuxt-link :to="localeRout('/login')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
                >
                  {{$t('edit_report_cancel')}}
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


import { email, required, helpers, minLength } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn } from 'mdbvue';

//Валидатор пароля
const passwordValid = helpers.regex('alpha', /^[a-zA-Zа-яёА-ЯЁ0-9_!@#$%^&*]*$/)

export default {
  name: "NewPassword",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    email: '',
    password:'',
    error: '',
    code: '',
    step: 1,
  }),
  validations:{
    email: {email, required},
    password: {
        required,
        minLength: minLength(6),
        passwordValid
      },
  },
  methods:{
    localeRout,
    async stepOne(){
      this.$v.email.$touch();
      if(this.$v.email.$invalid){
        return;
      }

      try {
        await this.$axios.post('/auth/email-recovery', { email: this.email })
        this.step = 2
        this.error = ''
      } catch (error) {
        this.error = this.$t('new_password_email_not_exist');
      }
    },
    async stepTwo(){
      this.$v.password.$touch();
      if(this.$v.password.$invalid){
        return;
      }
      
      try {
        await this.$axios.post('/auth/email-recovery/code', { email: this.email, code:this.code })
        //Пересылать на страницу нотификаций с сообщением что парль успешно изменён.
        this.$router.push(this.localeRout('/Login'));
      } catch (error) {
        this.error = this.$t('new_password_error_code');
      }

    }
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