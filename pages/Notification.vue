<template>
  <div>
    <div v-if="type==='email'" class="container">
      <h3>{{$tc('notification_email_confirm', 1, { email: message })}}</h3>
      <nuxt-link
        :to="localeRout('/login')" 
        class="mt-4 btn teal lighten-2 text-decoration-none ripple-parent text-white"
      >
        {{$t('log_authorization')}}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mdbBtn } from 'mdbvue';
import {localeRout} from '@/assets/utils';

export default {
  name: "Notification",
  layout: 'EmptyLayout',
  data() {
    return {
      type: this.$route.query.type,
      message: this.$route.query.message,
    };
  },
  methods: {
    localeRout,
  },
  components: { mdbBtn }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button {
    margin-top: 30px;
  }
</style>
