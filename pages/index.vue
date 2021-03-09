<template>
  <mdb-col md="6" sm='12' class='px-0 col_m'>
    <div class="descrption px-3 pb-md-0 pb-sm-3 pt-md-2 pt-sm-3 pt-xs-3"
      :style="{height: this.$store.state.normalizeHeight+'px'}"
    >
      <p>{{$t('main_descrption_text_1')}}</p>
      <p>{{$t('main_descrption_text_2')}}
        <a href="http://nlr.ru/tus/20100921/rus/" target="_blank">{{$t('main_descrption_text_3')}}</a> 
        {{$t('main_descrption_text_4')}}
        <a href="https://www.rsl.ru/ru/events/afisha/conf/expert7666" target="_blank">{{$t('main_descrption_text_5')}}</a> 
        <br> {{$t('main_descrption_text_6')}}
      </p>
    </div>
    <div class="card bg-dark text-white text-center reg__card">
      <div class="card-img-overlay reg-card__overlay d-flex justify-content-center align-items-center px-2">
        <nuxt-link class="btn btn-danger reg-card__btn text-white d-flex" :to="localeRout('/registration')">{{$t('main_cardreg_register')}}</nuxt-link>
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
  name:'index',
  data:()=>({
    topicData:['main_congress_topic_1','main_congress_topic_2','main_congress_topic_3','main_congress_topic_4','main_congress_topic_5','main_congress_topic_6','main_congress_topic_7','main_congress_topic_8','main_congress_topic_9','main_congress_topic_10','main_congress_topic_11','main_congress_topic_12','main_congress_topic_13','main_congress_topic_14','main_congress_topic_15',],
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
  }
};

</script>

<style lang="scss">
</style>
