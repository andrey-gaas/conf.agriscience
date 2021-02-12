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
      <dropdown end>
        <dropdown-toggle class="teal lighten-2" slot="toggle">{{$t('header_language')}}</dropdown-toggle>
        <dropdown-menu >
          <nuxt-link class='dropdown-item locale_btn' tabindex="0" :to="switchLocalePath(RU)">Русский</nuxt-link>
          <nuxt-link class='dropdown-item locale_btn' tabindex="0" :to="switchLocalePath(EN)">English</nuxt-link>
        </dropdown-menu>
      </dropdown>
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
} from 'mdbvue';
import { setLocale, localeRout} from '@/assets/utils';
import { RU, EN } from '@/constants/language';

export default {
  data:()=>({
    RU,EN
  }),
  components: {
    'container': mdbContainer,
    'navbar': mdbNavbar,
    'logo': mdbNavbarBrand,
    'dropdown': mdbDropdown,
    'dropdown-item': mdbDropdownItem,
    'dropdown-menu': mdbDropdownMenu,
    'dropdown-toggle': mdbDropdownToggle,
  },
  methods:{
    setLocale,
    localeRout,
    testFetch() {
      this.$axios.post('/auth/email-recovery', { email: 'captain.destroyer@yandex.ru' })
        .then(res => console.log(res))
        .catch(({ response }) => console.log(response));
    }
  },
  data: () => ({ RU, EN }),
}
</script>
<style scoped>
.logo_white{
  height: 60px;
}
.locale_btn{
  z-index: 100;
}
</style>