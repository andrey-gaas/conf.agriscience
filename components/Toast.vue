<template>
  <div class="toast__mesage">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data: () => ({

  }),
  computed:{
    message(){
      return this.$store.getters.getToastMsg
    }
  },
  
}
</script>

<style>

.toast__mesage{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  padding: 15px;
  left:calc(70% - 100px);
  top: calc(25% - 30px);
  min-width: 200px;
  max-width: 350px;
  min-height: 60px;
  border: 5px solid rgba(46, 46, 46, 0.76);
  background-color: rgba(71, 71, 71, 0.74);
  border-radius: 10px;
  color: #eeeded;
  font-size: 18px;
  font-weight: bold;
}
</style>