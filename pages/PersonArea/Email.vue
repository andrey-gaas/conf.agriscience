<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
    <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"
        v-if="loading"
      >
        <span class="sr-only">Loading...</span>
    </div>
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" 
      v-if="!loading"
    >
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>Не пришло письмо?</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <p>
          Если вам не пишло письмо, проверти папку СПАМ, возможно оно попло туда.
        </p>
        <p>
          Также вы можете отправить писмо повторо или написать в оргкомитет.
        </p>
      </mdb-row>
    </mdb-container>
    <transition name="toast">
      <Toast
        v-if="isShowTost"
        :message='toastMessage'
      />
    </transition>
  </div>
</template>

<script>

import {localeRout, } from '@/assets/utils'

import Toast from '@/components/Toast';
import { mdbContainer,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol } from 'mdbvue';



export default {
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data: () => ({
    loading: true,
  }),
  computed:{
    
  },
  created(){
  
  },
  computed:{
  
  },
  mounted(){
    this.loading = false
  },
  methods:{
    localeRout,
    showTost(text){
      this.$store.commit('setToastMsg', text)
      this.isShowTost = true
      setTimeout(()=>{this.isShowTost = false}, 3000)
    },
  },
  components:{
    Toast, 
    mdbContainer, mdbBtn, mdbBtnGroup, mdbRow, mdbCol,
  }
};
</script>

<style lang="scss">

  .toast-enter ,.toast-leave-to{
    transform: translateY(-100%);
    transition: all .3s ease;
    opacity: 0;
  }
  .toast-enter-to, .toast-leave{
    transform: translateY(0);
    transition: all .3s ease;
    opacity: 1;
  }
</style>