<template>
  <header class="header">
    <div class="top-container">
      <img src="@/assets/img/logo_color.png" alt="logo international bibliographic congress" class="logo">
      <button class="button"
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
        <h4>Меню</h4>
        <a href="#" class="link">Ссылка 1</a>
        <a href="#" class="link">Ссылка 2</a>
        <a href="#" class="link">Ссылка 3</a>
        <a href="#" class="link">Регистрация</a>
        <a href="#" class="link">Вход</a>
      </div>
      <div class="section">
        <h4>Язык</h4>
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
  }),
  components: {},
  methods:{
    localeRout,
  },
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    width: 100%;
    z-index: 9999;
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
    height: 0;
    background: #eee;
    transition: .3s;
    overflow: hidden;

    &.open {
      height: 419px;
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
</style>