<template>
  <main class="main">
    <container class="main__img d-flex justify-content-center align-items-center flex-column">
      <h5>{{$t('main_header_subtitle')}}</h5>
      <h1 class="title">{{$t('main_header_title')}}</h1>
    </container>
    <container  class="p-0">
      <mdb-row class="mx-sm-0 m-xs-0">

        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <menu class='nav__menu w-100 m-0 p-0'>
            <ul class='menu__l m-0 p-0'>
              <li class='menu__i px-lg-4 py-lg-3 px-md-3 py-md-2'
                v-for="(item, ind ) in menuDataSm" :key="ind"
              >
                {{item.title}}
              </li>
            </ul>
          </menu>
        </mdb-col>
        <mdb-col md="6" sm='12' class='px-0 col_m'>
          <div class="descrption px-3 pb-md-0 pb-sm-3 pt-md-2 pt-sm-3 pt-xs-3">
            <p>{{$t('main_descrption_text_1')}}</p>
            <p>{{$t('main_descrption_text_2')}}<br>
              {{$t('main_descrption_text_3')}}
            </p>
          </div>
        </mdb-col>
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>
          <div class="organizetion flex-grow-1 p-3">
            <h3 class="title">{{$t('main_сoordinators_text_1')}}</h3>
            <p class="font-ubuntu">
              <span class='font-weight-bold'>{{$t('main_сoordinators_text_2')}}</span><br>
              {{$t('main_сoordinators_text_3')}}<br>
              {{$t('main_сoordinators_text_4')}}<br>
              {{$t('main_сoordinators_text_5')}}
            </p>
            <p class="font-ubuntu">
              <span class='font-weight-bold'>{{$t('main_сoordinators_text_6')}}</span><br>
              {{$t('main_сoordinators_text_7')}}<br>
              e-mail: nklelikova@ya.ru
            </p>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mx-sm-0 m-xs-0">
        <mdb-col col="3" class='px-0 d-sm-none d-xs-none d-md-block'>

          <!-- <div class="card-user m-md-2 m-lg-3">
            <div class="person-card_img rounded-circle shadow-lg" style="background-image: url(assets/img/reg_img.jpg);">
              <img src="assets/img/reg_img.jpg" class="rounded-circle h-100 w-100" alt="person image">
            </div>
            <p class="text-uppercase blue-grey-text text-center mt-3 mb-0">Веб программист</p>
            <h5 class="font-weight-bold mt-1 mb-2  text-center">Alex Nuzhdin</h5>
            <p class="grey-text  text-center">Мне 23 года, я деалю крутые сайты. Надо ещё текста добить, а то как-то маловато выходит. Нужно чтобы было хотя бы несколкьо строк.</p>
          </div> -->

        </mdb-col>
        <mdb-col md="6" sm='12' class='px-0 col_m c0l'>

          <div class="card bg-dark text-white text-center reg__card">
            <img src="assets/img/reg_img.jpg" class="card-img reg__card-img" alt="...">
            <div class="card-img-overlay reg-card__overlay d-flex flex-column justify-content-around">
              <h2 class="card-title reg-card__title">{{$t('main_cardreg_text_1')}}</h2>
              <nuxt-link class="btn btn-danger reg-card__btn text-white" :to="localeRout('/')">{{$t('main_cardreg_register')}}</nuxt-link>
            </div>
          </div>
          <div class="announcement">
            <h4 class="announcement__title">{{$t('main_announcement_text_1')}}</h4>
            <nuxt-link :to="localeRout('/registration')" class="ad__left text-decoration-none text-dark d-flex justify-content-around align-items-center">
                {{$t('main_announcement_text_2')}}<br>{{$t('main_announcement_text_3')}}
            </nuxt-link>
            <nuxt-link :to="localeRout('/registration')" class="ad__right text-decoration-none text-dark d-flex justify-content-around align-items-center">
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
          
          <mdb-card 
            v-for="(item, ind ) in bibCardData" :key="ind"
            class='m-sm-2 m-lg-3'
          >
            <mdb-view hover>
              <a href="#!">
                <mdb-card-image
                  src="/assets/img/reg_img.jpg"
                  alt="Card image cap"/>
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </a>
            </mdb-view>
            <mdb-card-body>
              <mdb-card-title class='text-info text-uppercase bib__card-title'>{{item.title}}</mdb-card-title>
              <mdb-card-text class="bib__card_text">{{item.text}}</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
          
        </mdb-col>
      </mdb-row>
    </container>
  </main>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbView, mdbMask, mdbAvatar
} from 'mdbvue';
import {localeRout} from '@/assets/utils'

export default {
  data:()=>({

    menuDataSm:[
      { title: 'main_menu_organising_committee' },
      { title: 'main_menu_program_committee' },
      { title: 'main_menu_publication_materials'},
      { title: 'main_menu_participants' },
      { title: 'main_menu_programma'},
    ],
    bibCardData:[
      { title:'main_card_organizetion_title_1',
        text:'main_card_organizetion_text_1'},
      { title:'main_card_organizetion_title_2',
        text:'main_card_organizetion_text_2'},
      { title:'main_card_organizetion_title_3',
        text:'main_card_organizetion_text_3'},
      { title:'main_card_organizetion_title_4',
        text:'main_card_organizetion_text_4'},
      { title:'main_card_organizetion_title_5',
        text:'main_card_organizetion_text_5'},
      
    ],
    topicData:['main_congress_topic_1','main_congress_topic_2','main_congress_topic_3','main_congress_topic_4','main_congress_topic_5','main_congress_topic_6','main_congress_topic_7','main_congress_topic_8','main_congress_topic_9','main_congress_topic_10','main_congress_topic_11','main_congress_topic_12','main_congress_topic_13','main_congress_topic_14','main_congress_topic_15',],
    isMenuDrop:false,
  }),
  methods:{
    localeRout,
  },
  components: {
    'container': mdbContainer,
    mdbCard, mdbRow, mdbCol, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbBtn, mdbView, mdbMask, mdbAvatar
  },
  created(){
    // this.menuData.map(arr =>{
    //   arr.map(el =>{
    //     el.title = this.$t(el.title)
    //   })
    // })
    this.menuDataSm.map(el =>{
      el.title = this.$t(el.title)
    })
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

.menu__i {
  font-family: Ubuntu;
  font-size: 16px
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
