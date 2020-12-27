<template>
  <navbar color="primary" scrolling>
    <container>
      <logo href="#" class="logo">header_logo</logo>
      <dropdown>
        <dropdown-toggle color="primary" slot="toggle">{{$t('header_language')}}</dropdown-toggle>
        <dropdown-menu>
          <dropdown-item ><nuxt-link :to="switchLocalePath(RU)">Русский</nuxt-link></dropdown-item>
          <dropdown-item ><nuxt-link :to="switchLocalePath(EN)">English</nuxt-link></dropdown-item>
        </dropdown-menu>
      </dropdown>
    </container>
  </navbar>
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
import { setLocale } from '@/assets/utils';
import { RU, EN } from '@/constants/language';

export default {
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
  },
  data: () => ({ RU, EN }),
}
</script>