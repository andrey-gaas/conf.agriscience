<template>
  <header class="header">
    <container class="d-flex justify-content-between align-items-center">
      <nuxt-link :to="localeRout('/')">
        <img src="@/assets/img/logo_color.png" alt="logo international bibliographic congress" class="logo">
      </nuxt-link>

      <div class="d-flex align-items-center">
        <div class="auth">
          <nuxt-link :to="localeRout('/registration')" class="link">{{$t('header_registration')}}</nuxt-link>
          <nuxt-link :to="localeRout('/login')" class="link">{{$t('header_login')}}</nuxt-link>
        </div>

        <div class="flags">
          <nuxt-link :to="switchLocalePath(RU)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_ru.svg" alt="flar rus" class="flag">
          </nuxt-link>
          <nuxt-link :to="switchLocalePath(EN)" class="m-2 d-block locale_btn">
            <img src="@/assets/img/flag_en.svg" alt="flag brit" class="flag">
          </nuxt-link>
        </div>
      </div>
    </container>
  </header>
</template>

<script>
import {
  mdbContainer, mdbNavbarBrand,
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





<style lang="scss" scoped>
  header {
    display: none;
    padding: 10px 0;

    @media (min-width: 768px) {
      display: block;
    }
  }
  .logo {
    height: 80px !important;
  }

  .auth {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }

  .link {
    color: #212529 !important;

    &:hover {
      text-decoration: none;
    }

    &:last-child {
      margin-left: 5px;
    }
  }
  .flags {
    display: none;
    margin-left: 16px;
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
    }
  }
  .flag {
    height: 45px;
    border: 1px solid #eee;
  }
  .burger-container {
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }
  .burger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    width: 35px;
    height: 27px;
    border: none;
    background: none;

    div {
      width: 100%;
      height: 4px;
      background: #666;
    }
  }
</style>
