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
          <h3>Важные даты</h3>
          <ul>
            <li>Окончание регистрации с докладом 15 марта.</li>
            <li>Окончание регистрации 26 апреля.</li>
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
.main{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.main__img {
  padding: 0 160px;
  height: 500px;
}

.title {
  font-family: Arsenal;
}

.descrption {
  font-family: Ubuntu;
  font-size: 15px;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 0 2rem !important;
  }
}

.font-ubuntu {
  font-family: Ubuntu;
}

.reg-card__title {
  font-family: Arsenal;
}

.reg__card {
  height: 350px;
}

.reg__card-img {
  height: 350px !important;
}
</style>
