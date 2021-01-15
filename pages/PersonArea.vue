<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" >
      <mdb-row class="m-0 bg-primary" p='3'>
        <h2 class="mb-0  white-text"><strong>Личный кабинет</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-row class="mb-4 col-12 mx-0 px-0">
          <mdb-col col="12" sm='12' md='6' lg='6' class='mb-sm-4 mb-4 mb-lg-0 mb-md-0'>
            <div class="person__img">
              <div class="person-card_img rounded-circle shadow-lg my-3 mx-0" style=""></div>
            </div>
            <span>{{$t('personarea_download_photo')}}</span>
            <div class="input-group mb-3">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                  ref="fileInput"
                  @change="setFileName"
                >
                <label class="custom-file-label" for="inputGroupFile01"
                  :class="{
                    input__label_text_ru: ($i18n.locale == 'ru'), 
                    input__label_text_en: ($i18n.locale == 'en'), 
                  }"
                
                >{{fileName}}</label>
              </div>
            </div>
            <mdb-btn class="m-0"
              color='primary'
            >{{$t('personarea_download')}}</mdb-btn>
            <h4 class="mb-2 mt-4">Профиль</h4>
            <nuxt-link :to="localeRout('/editprofile')" 
              class="mt-0 mb-0 mx-0 btn btn-primary text-decoration-none ripple-parent text-white"
            >
              Редактировать профиль
            </nuxt-link>
            
          </mdb-col>
          <mdb-col col="12" sm='12' md='6' lg='6' class=''>
            <mdb-tbl responsiveSm bordered>
              <mdb-tbl-head color="blue" textWhite class="rounded">
                <tr>
                  <th colspan="2"><h5 class="mb-0">Заявки на доклад</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr>
                  <th>Название Доклада</th>
                  <th>Редактировать</th>
                </tr>
                <tr
                  v-for="(item, key) in personReport" :key='key'
                >
                  <th>{{item.title}}</th>
                  <th>{{item.linc}}</th>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
            <nuxt-link :to="localeRout('/login')" 
              class="mt-0 mb-4 mx-0 btn btn-primary text-decoration-none ripple-parent btn-outline-primary text-white"
            >
              Подать заявку
            </nuxt-link>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-0 col-12 mx-0 px-0" >
          <mdb-col col="12" sm='12' md='6' lg='6' class=''>
            <mdb-tbl responsiveSm>
              <mdb-tbl-head color="blue" textWhite class="rounded">
                <tr>
                  <th colspan="2"><h5 class="mb-0">{{$t('personarea_profiledata_ru')}}</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr
                  v-for="(item, key) in personData" :key='key'
                >
                  <th>{{$t('personarea_'+key+'_'+RU)+':'}}</th>
                  <th>{{item}}</th>
                </tr>
                <tr>
                  <th>О себе</th>
                  <th v-if="personAboutMeRu != ''">{{personAboutMeRu}}</th>
                  <th v-else class="p-0">
                    <mdb-btn class="m-1 px-3 py-2" color='primary'>Добавить о себе</mdb-btn>
                  </th>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
          </mdb-col>
          <mdb-col col="12" sm='12' md='6' lg='6' p='' class=''>
            <mdb-tbl responsiveSm>
              <mdb-tbl-head color="blue" textWhite>
                <tr>
                  <th colspan="2"><h5 class="mb-0">{{$t('personarea_profiledata_en')}}</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr
                  v-for="(item, key) in personData" :key='key'
                >
                  <th>{{$t('personarea_'+key+'_'+EN)+':'}}</th>
                  <th>{{item}}</th>
                </tr>
                <tr>
                  <th>О себе</th>
                  <th v-if="personAboutMeEn != ''">{{personAboutMeEn}}</th>
                  <th v-else class="p-0">
                    <mdb-btn class="m-1 px-3 py-2" color='primary'>Добавить о себе</mdb-btn>
                  </th>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
          </mdb-col>
        </mdb-row>
      </mdb-row>
      
    </mdb-container>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';



export default {
  name: "PersonArea",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    personData:{},
    personAboutMeRu:'',
    personAboutMeEn:'',
    personDataRu:[],
    personDataEn:[],
    personReport:[{title:'Нет активных заявок', linck:''}],
    fileName: '',

  }),
  computed:{
    
  },
  created(){
    this.setData()
    
  },
  mounted(){
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    setFileName(){
      this.fileName = this.$refs.fileInput.files[0].name
    },
    setPersonDate(){
      let personData = this.$store.getters.getPersonData
      delete personData.locality; 
      delete personData.isConsent;
      delete personData.password;

    },
    setAboutMe(){
      this.$store.commit('setPersonAboutMe', this.personAboutMe);
    },
    setData(){
      //console.log(this.$store.getters.getPersonData);
      this.personAboutMeRu = this.$store.getters.getPersonAboutMeRu
      this.personAboutMeEn = this.$store.getters.getPersonAboutMeEn
      this.personData = this.$store.getters.getPersonData
      delete this.personData.locality; 
      delete this.personData.isConsent;
      delete this.personData.password;
      //this.setPersonDate()

      this.fileName = this.$t('personarea_select_file')
    },
  },
  components:{
    mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
  }
};
</script>

<style lang="scss">
  .person__img{
    width: 300px;
  }
  .input__label_text_ru{
    &::after{
      content:'Обзор...'
    }
  }
  .input__label_text_en{
    &::after{
      content:'Survey...'
    }
  }
</style>