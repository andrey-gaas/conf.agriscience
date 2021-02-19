<template>
  <nav class="navbar teal lighten-1 navbar-expand-lg p-0">
    <container p='2'>
      <logo href="#" class="logo">
        <nuxt-link :to="localeRout('/')">
          <img src="@/assets/img/logo_white.png" alt="Logo" class='logo_white'
            v-show="$i18n.locale == 'ru'"
          >
          <img src="@/assets/img/logo_white_en.png" alt="Logo" class='logo_white'
            v-show="$i18n.locale == 'en'"
          >
        </nuxt-link>
      </logo>
      <!-- <button @click="testFetch">Тестовый запрос</button> -->
      <div>
        <mdb-btn v-if="isAuth" class="logout-button" @click="logout">Выход</mdb-btn>
        <dropdown end>
          <dropdown-toggle class="teal lighten-2" slot="toggle">{{$t('header_language')}}</dropdown-toggle>
          <dropdown-menu >
            <nuxt-link class='dropdown-item locale_btn' tabindex="0" :to="switchLocalePath(RU)">Русский</nuxt-link>
            <nuxt-link class='dropdown-item locale_btn' tabindex="0" :to="switchLocalePath(EN)">English</nuxt-link>
          </dropdown-menu>
        </dropdown>
      </div>
    </container>
  </nav>
</template>

<script>
import {
  mdbContainer,
  mdbNavbar,
  mdbNavbarBrand,
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbBtn,
} from 'mdbvue';
import { setLocale, localeRout} from '@/assets/utils';
import { RU, EN } from '@/constants/language';

export default {
  data: () => ({
    RU, EN,
  }),
  components: {
    'container': mdbContainer,
    'navbar': mdbNavbar,
    'logo': mdbNavbarBrand,
    'dropdown': mdbDropdown,
    'dropdown-item': mdbDropdownItem,
    'dropdown-menu': mdbDropdownMenu,
    'dropdown-toggle': mdbDropdownToggle,
    'mdb-btn': mdbBtn,
  },
  methods:{
    setLocale,
    localeRout,
    logout() {
      const axios = this.$axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
      })
      axios.get('/auth/logout')
        .then(({ data }) => {
          console.log(data);
          if (data === 'OK') {
            this.$store.commit('setIsAuth', false)
            this.$router.push('/');
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    setAuthorizarion() {
      const token = this.$cookies.get('token');
      if (token) {
        const AxiosTooken = this.$axios.create({
          headers: { 'Authorization': token },
          baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
        });
        AxiosTooken.get('/auth/check')
          .then((res) => {
            this.$store.commit('setIsAuth', true)
          })
          .catch(error => {
            this.$store.commit('setIsAuth', false)
            console.log(error.message);
          })
      } else {
        this.$store.commit('setIsAuth', false)
      }
    },
    testFetch() {
      this.$axios.get('/auth/check', { headers: { 'Authorization': this.$cookies.get('token') } })
        .then(res => console.log(res))
        .catch(({ response }) => console.log(response));
    },
  },
  created() {
    this.setAuthorizarion();
  },
  computed:{
    isAuth(){return this.$store.getters.getIsAuth}
  }
}
</script>
<style scoped>
.logo_white{
  height: 60px;
}
.locale_btn{
  z-index: 100;
}
.logout-button {
  margin-right: 20px;
}
</style>