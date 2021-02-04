<template>
  <menu class='nav__menu w-100 h-100 m-0 p-0'>
    <ul class='menu__l m-0 p-0'>
      <nuxt-link  class="menu__i d-flex px-lg-4 py-lg-3 px-md-3 py-md-2"
          v-for="(item, ind) of menuDataSm" :key='ind'
          :to="localeRout(`/${item.linck}`)"
          :class="{disabled:(item.linck == undefined || item.linck == '')}"
      >{{item.title}}</nuxt-link>
    </ul>
  </menu>
</template>

<script>
import {localeRout} from '@/assets/utils'

export default {
  data:()=>({

    menuDataSm:[
      { title: 'main_menu_organising_committee',  },
      { title: 'main_menu_program_committee', },
      { title: 'main_menu_publication_materials'},
      { title: 'main_menu_participants' },
      { title: 'main_menu_programma'},
      { title: 'main_menu_important_dates', linck:'ImportantDates'},
    ],
  }),
  methods:{
    localeRout
  },
  created(){
    this.menuDataSm.map(el =>{
      el.title = this.$t(el.title)
    })
  },

}
</script>

<style lang="scss" scope>
a.menu__i {
  font-family: Ubuntu;
  font-size: 16px;
  font-weight: 400;
  color: rgb(27, 27, 27) !important;
  &:hover{
    color: rgb(27, 27, 27) !important;
  }

  &.disabled{
    color:rgb(122, 122, 122) !important;
  }
}
</style>