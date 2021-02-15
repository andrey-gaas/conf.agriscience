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
        <mdb-col md="6" sm='12' class='px-0 col_m'>
          <div class="descrption px-3 pb-md-0 pb-sm-3 pt-md-2 pt-sm-3 pt-xs-3">
            <p>{{$t('main_descrption_text_1')}}</p>
            <p>{{$t('main_descrption_text_2')}}
              <a href="http://nlr.ru/tus/20100921/rus/" target="_blank">{{$t('main_descrption_text_3')}}</a> 
              {{$t('main_descrption_text_4')}}
              <a href="https://www.rsl.ru/ru/events/afisha/conf/expert7666" target="_blank">{{$t('main_descrption_text_5')}}</a> 
              <br> {{$t('main_descrption_text_6')}}
            </p>
          </div>
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

          <div class="card bg-dark text-white text-center reg__card">
            <img src="assets/img/reg_img.jpg" class="card-img reg__card-img" alt="...">
            <div class="card-img-overlay reg-card__overlay d-flex flex-column justify-content-around">
              <h2 class="card-title reg-card__title">{{$t('main_cardreg_text_1')}}</h2>
              <nuxt-link class="btn btn-danger reg-card__btn text-white" :to="localeRout('/registration')">{{$t('main_cardreg_register')}}</nuxt-link>
            </div>
          </div>
          <div class="announcement">
            <h4 class="announcement__title">{{$t('main_announcement_text_1')}}</h4>
            <nuxt-link :to="localeRout('/registration')" class="ad__left p-1 text-decoration-none text-dark d-flex justify-content-around align-items-center">
                {{$t('main_announcement_text_2')}}<br>{{$t('main_announcement_text_3')}}
            </nuxt-link>
            <nuxt-link :to="localeRout('/registration')" class="ad__right p-1 text-decoration-none text-dark d-flex justify-content-around align-items-center">
              {{$t('main_announcement_text_4')}}<br>{{$t('main_announcement_text_5')}}
            </nuxt-link>
          </div>
          <div class="congress-topics">
            <h2 class="congress-topic__title">{{$t('main_congress_title')}}</h2>
            <ul class="congress-topic__list px-4">
              <li class="congress-topic__item mb-2"
                v-for="(item,ind ) in topicData" :key="ind"
              >
                {{item}}
              </li>
              
            </ul>
          </div>

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
    topicData:['main_congress_topic_1','main_congress_topic_2','main_congress_topic_3','main_congress_topic_4','main_congress_topic_5','main_congress_topic_6','main_congress_topic_7','main_congress_topic_8','main_congress_topic_9','main_congress_topic_10','main_congress_topic_11','main_congress_topic_12','main_congress_topic_13','main_congress_topic_14','main_congress_topic_15',],
    isMenuDrop:false,
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
    this.topicData = this.topicData.map(el =>{
      return this.$t(el)
      
    })
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
