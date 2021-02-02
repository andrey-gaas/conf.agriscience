<template>
  <div>
    <div v-if="type==='email'" class="container">
      <h3>{{$tc('notification_email_confirm', 1, { email: message })}}</h3>
      <nuxt-link
        v-show="!isAuthorized"
        :to="localeRout('/login')" 
        class="mt-4 btn teal lighten-2 text-decoration-none ripple-parent text-white"
      >
        {{$t('log_authorization')}}
      </nuxt-link>
      <nuxt-link
        v-show="isAuthorized"
        :to="localeRout('/personarea')" 
        class="mt-4 btn teal lighten-2 text-decoration-none ripple-parent text-white"
      >
        {{$t('notification_person_area')}}
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
      isAuthorized : false,
    };
  },
  methods: {
    localeRout,
    async setAuthorizarion(){
      const token = this.$cookies.get('token')
      if (token) {
        const AxiosTooken = this.$axios.create({
          headers: { 'Authorization': token },
          baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
        });
      this.isAuthorized = await AxiosTooken.get('/user/')
        .then(() => {
          return  true
        })
        .catch(() => {
          return false
        });
      } else {
        this.isAuthorized = false
      }
    }
  },
  components: { mdbBtn },
  async created(){
    await this.setAuthorizarion()
    
  },
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
