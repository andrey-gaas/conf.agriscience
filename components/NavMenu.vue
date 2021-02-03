<template>
  <menu class='nav__menu w-100 h-100 m-0 p-0'>
    <ul class='menu__l m-0 p-0'>
      <li class='menu__i px-lg-4 py-lg-3 px-md-3 py-md-2'
        v-for="(item, ind ) in menuDataSm" :key="ind"
        :class="{disabled:(item.linck == undefined || item.linck == '')}"
      >
        {{item.title}}
      </li>
    </ul>
  </menu>
</template>

<script>

export default {
  data:()=>({

    menuDataSm:[
      { title: 'main_menu_organising_committee',  },
      { title: 'main_menu_program_committee', },
      { title: 'main_menu_publication_materials'},
      { title: 'main_menu_participants' },
      { title: 'main_menu_programma'},
      { title: 'main_menu_important_dates'},
    ],
  }),
  created(){
    this.menuDataSm.map(el =>{
      el.title = this.$t(el.title)
    })
  },

}
</script>

<style lang="scss" scope>
.menu__i {
  font-family: Ubuntu;
  font-size: 16px;
  font-weight: 400;

  &.disabled{
    color:rgb(122, 122, 122)
  }
}
</style>