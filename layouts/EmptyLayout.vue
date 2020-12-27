<template>
  <div class="empty_layout_wrap min-h-100">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header-empty';


export default {
  components: {
    Header
  },
}
</script>

<style>
.empty_layout_wrap{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
