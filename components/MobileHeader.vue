<template>
  <header class="header">
    <div class="top-container">
      <img src="@/assets/img/logo_color.png" alt="logo international bibliographic congress" class="logo"
        v-show="$i18n.locale === 'ru'"
      >
      <img src="@/assets/img/logo_color_en.png" alt="logo international bibliographic congress" class="logo"
        v-show="$i18n.locale === 'en'"
      >
      <button class="button mobile-header__button"
        @click="isOpen = !isOpen"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
    <div class="nav-container" 
      :class="{open: isOpen}"
    >
      <div class="section">
        <nuxt-link  class="link mobile-header__linck"
          v-for="(item, ind) of menuDataSm" :key='ind'
          :to="localeRout(`/${item.linck}`)"
          :class="{disabled: item.linck == ''}"
        >{{$t(item.title)}}</nuxt-link>
        
        <nuxt-link class="link mobile-header__linck"
          :to="localeRout('/registration')" v-if="!isAuthorized"
        >{{$t('header_registration')}}
        </nuxt-link>
        <nuxt-link class="link mobile-header__linck"
          :to="localeRout('/login')" v-if="!isAuthorized"
        >{{$t('header_login')}}
        </nuxt-link>
        <nuxt-link class="link mobile-header__linck"
          :to="localeRout('/personarea')" v-if="isAuthorized"
        >{{$t('header_person_area')}}
        </nuxt-link>
        <a v-if="isAuthorized" @click="extiPersonArea()" class="link mobile-header__linck"
        >{{$t('header_exit')}}
        </a>
      
        
      </div>
      <div class="section">
        <h4>{{$t('mobile_menu_language')}}</h4>
        <div class="flags">
          <nuxt-link :to="switchLocalePath(RU)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_ru.svg" alt="flar rus" class="flag">
          </nuxt-link>
          <nuxt-link :to="switchLocalePath(EN)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_en.svg" alt="flag brit" class="flag">
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout, deletCookieToken} from '@/assets/utils'

export default {
  data:()=>({
    isOpen: false,
    isAuthorized:false,
    RU, EN,
    menuDataSm:[
      { title: 'main_menu_organising_committee', linck:'' },
      { title: 'main_menu_program_committee', linck:'' },
      { title: 'main_menu_publication_materials', linck:''},
      { title: 'main_menu_participants', linck:'' },
      { title: 'main_menu_programma', linck:''},
      { title: 'main_menu_important_dates', linck:''},
    ],
  }),
  methods:{
    localeRout,deletCookieToken,
    async extiPersonArea(){
      const axios = this.$axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
      })
      await axios.get('/auth/logout')
        .then(({ data }) => {
          console.log(data);
          if (data === 'OK') {
            this.$store.commit('setIsAuth', false);
            this.$store.commit('setIsAdmin', false);
            this.$router.push(this.localeRout('/'));
            this.deletCookieToken()
          }
        })
        .catch(error => {
          console.log(error.message);
        });
      this.setAuthorizarion()
    },
    async setAuthorizarion(){
      const token = this.$cookies.get('token')
      if(token){
        const AxiosTooken = this.$axios.create({
        headers: { 'Authorization': token },
        baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
        });
        this.isAuthorized = await AxiosTooken.get('/user/').then(()=>{
          return  true
        }).catch(()=>{
          return false
        })
      }else{
        this.isAuthorized = false
      }
    },
  },
  async created(){
    await this.setAuthorizarion()
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    width: 100%;
    height: 70px;
    z-index: 9999;
    @media (min-width: 768px) {
      display: none;
    }
  }
  .top-container {
    display: flex;
    align-items: center;

    padding: 10px 20px;
    width: 100%;
    background: #eee;
    @media (min-width: 768px) {
      display: none;
    }
  }

  .logo {
    height: 50px;
  }

  .button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: auto;
    padding: 0;
    width: 30px;
    height: 23px;
    border: none;
    background: none;

    div {
      height: 3px;
      width: 100%;
      background: #666;
    }
  }

  .nav-container {
    width: 100%;
    background: #eee;
    transition: .3s;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: 0 0;
    opacity: 0;
    &.open {
      opacity: 1;
      transform: scaleY(1);
      padding-bottom: 14px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }

    .section {
      display: flex;
      flex-direction: column;
    }

    h4 {
      margin: 20px;
    }

    .link {
      padding: 10px 20px;
      font-size: 20px;
      color: #333;
      border-top: 1px solid #aaa;
      &:last-child {
        border-bottom: 1px solid #aaa;
      }

      &:hover {
        text-decoration: none;
        background: #ddd;
      }
    }

    .flags {
      display: flex;
      align-items: center;
      img {
        height: 45px;
        border: 1px solid #eee;
      }
    }
  }
  .mobile-header__button{
    outline: none;
  }
  .mobile-header__linck{
    &.disabled{
      color: #aaa
    }
  }
</style>