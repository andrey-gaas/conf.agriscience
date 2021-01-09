<template>
  <header class="header">
    <container class="h-100 d-flex justify-content-between align-items-center head__conteiner">
      <nuxt-link :to="localeRout('/')" class="header__logo-linck">
        <img src="@/assets/img/logo_color.png" alt="logo international bibliographic congress" class="header__logo">
      </nuxt-link>
      
      <div class="hader_left d-flex align-items-center pt-4 ml-3">
        <div class="login__wrap mr-3">
          <nuxt-link :to="localeRout('/Register')">{{$t('header_registration')}}</nuxt-link>
          <span>/</span>
          <nuxt-link :to="localeRout('/Register')">{{$t('header_login')}}</nuxt-link>
        </div>
        <div class="locale_btn_wrap d-flex">
          <nuxt-link :to="switchLocalePath(RU)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_ru.svg" alt="flar rus" class="header__img-flag">
          </nuxt-link>
          <nuxt-link :to="switchLocalePath(EN)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_en.svg" alt="flag brit" class="header__img-flag h-100">
          </nuxt-link>
        </div>
      </div>
      <div class="login__wrap_sm">
          <nuxt-link :to="localeRout('/Register')">{{$t('header_registration')}}</nuxt-link>
          <nuxt-link :to="localeRout('/Register')">{{$t('header_login')}}</nuxt-link>
      </div> 
    </container>
  </header>
</template>

<script>
import {
  mdbContainer, mdbNavbarBrand
} from 'mdbvue';
import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

export default {
  components: {
    'container': mdbContainer,
    'logo': mdbNavbarBrand,
  },
  methods:{
    localeRout,
  },
  data: () => ({ RU, EN }),
}
</script>
<style>


</style>