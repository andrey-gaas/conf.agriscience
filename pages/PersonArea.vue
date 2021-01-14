<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="" p="2" m='0'>
      <mdb-row class="">
        <mdb-col col="6" class=''>
          st
        </mdb-col>
        <mdb-col col="6" class=''>
          tt
        </mdb-col>
      </mdb-row>
      <mdb-row class="">
        <mdb-col col="6" class=''>
          gg
        </mdb-col>
        <mdb-col col="6" class=''>
          pp
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import { mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol } from 'mdbvue';



export default {
  name: "PersonArea",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,

  }),
  computed:{
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    
  },
  components:{
    mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol
  }
};
</script>

<style lang="scss">

</style>