<template>
  <div class="empty_layout_wrap min-h-100">
    <Header />
    <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
      <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"
        v-if="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <client-only>
        <Nuxt />
      </client-only>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header-empty';


export default {
  data: ()=>({
    loading: true,
  }),
  components: {
    Header
  },
  mounted(){
    this.loading = false;
  }
}
</script>

<style>
.empty_layout_wrap{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 360px;
}
</style>
