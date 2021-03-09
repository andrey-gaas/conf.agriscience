<template>
  <div class="main_layout_wrap min-h-100">
    <Header />
    <MobileHeader />
    <main class="main">
      <container class="main__img d-flex justify-content-center align-items-center flex-column">
        <h5>{{$t('main_header_subtitle')}}</h5>
        <h1 class="title">{{$t('main_header_title')}}</h1>
      </container>
      <container  class="p-0" style="position:relative;">
        <iframe name="frame" width=100% height='0px' 
                style="position:absolute;z-index:-1; opasity: 0" 
                frameborder="0" src="about:blank">
        </iframe>
        <mdb-row class="mx-sm-0 m-xs-0">
          <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
            <Menu
              :style="{height: this.$store.state.normalizeHeight+'px'}"
              ref="menuNavBar"
            />
            <!-- <PersonCard/> -->
          </mdb-col>
            <Nuxt :key='rerenderConteinerKey' />
          <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
            <Coordinators
              :style="{height: this.$store.state.normalizeHeight+'px'}"
              ref="coordinators"
            />
            <CoorCard
              v-for="(item, ind) in bibCardData" :key="ind"
              :title='item.title'
              :img='item.img'
              :text='item.text'
              :text2='item.text2'
              :href='item.href'
            />
          </mdb-col>
        </mdb-row>
      </container>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import MobileHeader from '@/components/MobileHeader';
import Footer from '@/components/Footer';
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
    containerWidth: 0,
    rerenderConteinerKey: 0,
    bibCardData:[
      { title:'main_card_organizetion_title_1',
        text:'main_card_organizetion_text_1',
        href:'http://www.spsl.nsc.ru/',
        img:'GPNTB_SO_RAN.jpg'},
      { title:'main_card_organizetion_title_2',
        text:'main_card_organizetion_text_2',
        href:'http://www.rba.ru/',
        img:'RBA.jpg'},
      { title:'main_card_organizetion_title_3',
        text:'main_card_organizetion_text_3',
        text2:'main_card_organizetion_text_3_1',
        href:'http://nlr.ru/',
        img:'RNB.jpg'},
      { title:'main_card_organizetion_title_4',
        text:'main_card_organizetion_text_4',
        text2:'main_card_organizetion_text_4_1',
        href:'https://www.rsl.ru/',
        img:'RGB.jpg'},
    ],
    
    isMenuDrop:false,
  }),
  computed:{
  },
  watch:{
    
  },
  methods:{
    localeRout,
    setNormalizeHeight(){
      if(this.$refs.menuNavBar.$el.children[0].clientHeight === 0 || this.$refs.coordinators.$el.children[0].clientHeight === 0 ){
        this.$store.commit('setNormalizeHeight', -1)
        this.rerenderConteinerKey++
        return
      }
      if(this.$refs.menuNavBar.$el.children[0].clientHeight > (this.$refs.coordinators.$el.children[0].clientHeight + 32)){
        this.$store.commit('setNormalizeHeight', this.$refs.menuNavBar.$el.children[0].clientHeight)
      }else{
        this.$store.commit('setNormalizeHeight', this.$refs.coordinators.$el.children[0].clientHeight+32)
      }
    }
  },
  created(){
    this.bibCardData.map(el =>{
      el.title = this.$t(el.title)
      el.text = this.$t(el.text)
      el.text2 = this.$t(el.text2)
    })
  },
  async mounted(){
    
    this.setNormalizeHeight()
    frame.onresize = () => {this.setNormalizeHeight()}
  },
  components: {
    Header, Footer, MobileHeader,
    Menu, Coordinators, CoorCard, PersonCard,
    'container': mdbContainer,
    mdbRow, mdbCol,  mdbBtn,
  },
}
</script>

<style>
.main_layout_wrap{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
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

.reg-card__btn{
  max-width: 250px;
  height: min-content;
}
</style>
