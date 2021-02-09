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
              <h2 class="form__title mb-0  white-text"><strong>Восстановление пароля</strong></h2>
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
              <div>
                <mdb-btn class="mt-4 mb-0 teal lighten-2" type="submit">
                  Восстановить
                </mdb-btn>
                <nuxt-link :to="localeRout('/login')" 
                  class="mt-4 mb-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
                >
                  Отмена
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


import { email, required } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn } from 'mdbvue';
//Валидатор пароля

export default {
  name: "NewPassword",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    email: '',
    error: '',
  }),
  validations:{
    email: {email, required},
  },
  methods:{
    localeRout,
    async formSubmit(){
      this.$v.email.$touch();
      if(this.$v.email.$invalid){
        return;
      }

      await this.$axios.post('/auth/email-recovery', { email: this.email })
        .then(res => console.log(res))
        .catch(({ response }) => console.log(response));
      
      
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