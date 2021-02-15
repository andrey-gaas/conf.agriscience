<template>
  <main class="main">
    <container class="main__img d-flex justify-content-center align-items-center flex-column">
      <h5>{{$t('main_header_subtitle')}}</h5>
      <h1 class="title">{{$t('main_header_title')}}</h1>
    </container>
    <container  class="p-0">
      <mdb-row class="mx-sm-0 m-xs-0">
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <Menu />
        </mdb-col>
        <mdb-col md="6" sm='12' class='p-4 col_m'>
          <h3>{{$t('important_dates')}}</h3>
          <ul class="pl-3">
            <li><strong>{{$t('important_dates_data_1')}}</strong> - {{$t('important_dates_data_1_text')}}</li>
            <li><strong>{{$t('important_dates_data_2')}}</strong> - {{$t('important_dates_data_2_text')}}</li>
            <li><strong>{{$t('important_dates_data_3')}}</strong> - {{$t('important_dates_data_3_text')}}</li>
          </ul>
        </mdb-col>
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <Coordinators />
        </mdb-col>
      </mdb-row>
      <mdb-row class="mx-sm-0 m-xs-0">
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <!-- <PersonCard/> -->
        </mdb-col>
        <mdb-col md="6" sm='12' class='px-0 col_m c0l'>

        </mdb-col>
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <CoorCard
            v-for="(item, ind) in bibCardData" :key="ind"
            :title='item.title'
            :img='item.img'
            :text='item.text'
          />
        </mdb-col>
      </mdb-row>
    </container>
  </main>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbBtn
} from 'mdbvue';
import {localeRout} from '@/assets/utils'

import Menu from '@/components/NavMenu'
import Coordinators from '@/components/Coordinators'
import CoorCard from '@/components/CoordinatorsCard'
import PersonCard from '@/components/PersonCard'

export default {
  data:()=>({
    bibCardData:[
      { title:'main_card_organizetion_title_1',
        text:'main_card_organizetion_text_1',
        img:'GPNTB_SO_RAN.jpg'},
      { title:'main_card_organizetion_title_2',
        text:'main_card_organizetion_text_2',
        img:'RBA.jpg'},
      { title:'main_card_organizetion_title_3',
        text:'main_card_organizetion_text_3',
        img:'RNB.jpg'},
      { title:'main_card_organizetion_title_4',
        text:'main_card_organizetion_text_4',
        img:'RGB.jpg'},
    ],
  }),
  methods:{
    localeRout,
  },
  components: {
    Menu, Coordinators, CoorCard, PersonCard,
    'container': mdbContainer, 
    mdbRow, mdbCol,  mdbBtn,
  },
  created(){
    this.bibCardData.map(el =>{
      el.title = this.$t(el.title)
      el.text = this.$t(el.text)
    })
  },
};

</script>

<style lang="scss" scope>

</style>
