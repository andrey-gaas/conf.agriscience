<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
    <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"
        v-if="loading"
      >
        <span class="sr-only">Loading...</span>
    </div>
    <mdb-container class="email-container rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" 
      v-if="!loading"
    >
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>{{$t('emeil_title')}}</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <div class="d-flex flex-column w-100">
          <ul class="pl-4 email-message__list mb-0">
            <li class="mb-3">
              {{$t('emeil_message_1')}} <br> {{$t('emeil_message_2')}}
            </li>
            <li class="mb-3">
              <span class='d-flex mb-2'>
                {{$t('emeil_message_3')}}
              </span>
              <mdb-btn class="m-0 px-3 py-2 teal lighten-2" @click="sendMail">
                {{$t('emeil_send')}}
              </mdb-btn>
            </li>
            <!-- <li>
              <span class="d-flex">
                Напишите писмо в оргкомитет на почту orgkomitet@gpntb.ru следующиее сообщение:
              </span>
              <span>"Не приходит сообщения для подтвержджения почты. /ваш адресс почты/"</span>
            </li> -->
          </ul>
        </div>
        <nuxt-link
          v-show="!isAuthorized"
          :to="localeRout('/login')" 
          class="mt-3 btn teal lighten-2 text-decoration-none ripple-parent text-white"
        >
          {{$t('log_authorization')}}
        </nuxt-link>
        <nuxt-link
          v-show="isAuthorized"
          :to="localeRout('/personarea')" 
          class="mt-3 btn teal lighten-2 text-decoration-none ripple-parent text-white"
        >
          {{$t('notification_person_area')}}
        </nuxt-link>
      </mdb-row>
    </mdb-container>
    <transition name="toast">
      <Toast
        v-if="isShowTost"
        :message='toastMessage'
      />
    </transition>
  </div>
</template>

<script>

import {localeRout, } from '@/assets/utils'

import Toast from '@/components/Toast';
import { mdbContainer,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol } from 'mdbvue';

export default {
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data: () => ({
    loading: true,
    isAuthorized : false,
  }),
  computed:{
    
  },
  created(){
  
  },
  computed:{
    isEmeilConfirm(){
      return this.$store.getters.getEmailСonfirm
    }
  },
  mounted(){
    this.loading = false
  },
  methods:{
    localeRout,
    showTost(text){
      this.$store.commit('setToastMsg', text)
      this.isShowTost = true
      setTimeout(()=>{this.isShowTost = false}, 3000)
    },
    sendMail(){
      if(isEmeilConfirm){
        return
      }
      console.log('send');
    },
    async setAuthorizarion(){
      const token = this.$cookies.get('token')
      if (token) {
        const AxiosTooken = this.$axios.create({
          headers: { 'Authorization': token },
          baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
        });
      this.isAuthorized = await AxiosTooken.get('/user/')
        .then(() => {
          return  true
        })
        .catch(() => {
          return false
        });
      } else {
        this.isAuthorized = false
      }
    }
  },
  async created(){
    await this.setAuthorizarion()
  },
  components:{
    Toast, 
    mdbContainer, mdbBtn, mdbBtnGroup, mdbRow, mdbCol,
  }
};
</script>

<style lang="scss">
  
  .toast-enter ,.toast-leave-to{
    transform: translateY(-100%);
    transition: all .3s ease;
    opacity: 0;
  }
  .toast-enter-to, .toast-leave{
    transform: translateY(0);
    transition: all .3s ease;
    opacity: 1;
  }
  .email-message__list>li{
    list-style: decimal;
  }
</style>