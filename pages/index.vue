<template>
  <div class="index_wrap">
    <container>
      <NuxtLink :to="localeRout('/form')">FORM</NuxtLink>
    </container>
  </div>
</template>

<script>
import {
  mdbContainer,
} from 'mdbvue';

export default {
  methods:{
    localeRout(path){
      if(this.$i18n.locale == 'ru') return path
      return ('/' + this.$i18n.locale + path)
    },
  },
  components: {
    'container': mdbContainer,
  },
};

</script>

<style>
.index_wrap{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
