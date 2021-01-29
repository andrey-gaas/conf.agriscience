<template>
  <header class="header">
    <div class="top-container">
      <img src="@/assets/img/logo_color.png" alt="logo international bibliographic congress" class="logo">
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
        >{{item.title}}</nuxt-link>
      
        
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
import {localeRout} from '@/assets/utils'

export default {
  data:()=>({
    isOpen: false,
    RU, EN,
    menuDataSm:[
      { title: 'main_menu_organising_committee', linck:'' },
      { title: 'main_menu_program_committee', linck:'' },
      { title: 'main_menu_publication_materials', linck:''},
      { title: 'main_menu_participants', linck:'' },
      { title: 'main_menu_programma', linck:''},
      { title: 'header_registration', linck:'registration'},
      { title: 'header_login', linck:'login'},
    ],
  }),
  components: {},
  methods:{
    localeRout,
  },
  created(){
    this.menuDataSm.map(el =>{
      el.title = this.$t(el.title)
    })
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    width: 100%;
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