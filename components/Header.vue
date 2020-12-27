<template>
  <header class="header">
    <container>
      <logo href="#" class="logo">header_logo</logo>
      <div class="locale_btn">
        <nuxt-link :to="switchLocalePath(RU)">Русский</nuxt-link>
        <nuxt-link :to="switchLocalePath(EN)">English</nuxt-link>
      </div>
    </container>
  </header>
</template>

<script>
import {
  mdbContainer, mdbNavbarBrand
} from 'mdbvue';
import { RU, EN } from '@/constants/language';

export default {
  components: {
    'container': mdbContainer,
    'logo': mdbNavbarBrand,
  },
  methods:{

  },
  data: () => ({ RU, EN }),
}
</script>
<style>

</style>