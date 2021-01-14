<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="border border-light rounded-lg grey lighten-5" p="2" m=''>
      <mdb-row class="">
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          st
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <h3 class="title__doclad">Добавить доклад</h3>
          <mdb-input
            wrapperClass="pink-textarea"
            type="textarea"
            label="Pink textarea"
          />
        </mdb-col>
      </mdb-row>
      <mdb-row class="">
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <mdb-tbl responsiveSm>
            <tr
              v-for="(item, key) in personData" :key='key'
            >
              <th>{{$t('reg_'+key)+':'}}</th>
              <th>{{item}}</th>
            </tr>
          </mdb-tbl>
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <mdb-tbl responsiveSm>
            <tr
              v-for="(item, key) in personData" :key='key'
            >
              <th>{{$t('reg_'+key, 'en')+':'}}</th>
              <th>{{item}}</th>
            </tr>
          </mdb-tbl>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import { mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol, mdbTbl } from 'mdbvue';



export default {
  name: "PersonArea",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    personData:{}

  }),
  computed:{
    
  },
  created(){
    console.log(this.$store.getters.getPersonData);
    this.personData = this.$store.getters.getPersonData
    
    delete this.personData.locality; 
    delete this.personData.isConsent;
    delete this.personData.password;
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    
  },
  components:{
    mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol, mdbTbl
  }
};
</script>

<style lang="scss">

</style>