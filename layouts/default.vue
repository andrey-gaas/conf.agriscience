<template>
  <div class="main_layout_wrap min-h-100">
    <Header />
    <MobileHeader />
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import MobileHeader from '@/components/MobileHeader';
import Footer from '@/components/Footer';

export default {
  components: {
    Header, Footer, MobileHeader,
  },
}
</script>

<style>
.main_layout_wrap{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
