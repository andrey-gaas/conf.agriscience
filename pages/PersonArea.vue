<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1" p="2" m=''>
      <mdb-row class="mb-4">
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
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
          </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <nuxt-link :to="localeRout('/login')" 
            class="mt-4 mb-0 btn btn-primary text-decoration-none ripple-parent btn-outline-primary text-white"
          >
            Подать заявку на доклад
          </nuxt-link>
        </mdb-col>
      </mdb-row>
      <mdb-row class="">
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
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
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
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import { mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';



export default {
  name: "PersonArea",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    personData:{},
    personDataRu:[],
    personDataEn:[],
    fileName: '',

  }),
  computed:{
    
  },
  created(){
    //console.log(this.$store.getters.getPersonData);
    this.personData = this.$store.getters.getPersonData
    delete this.personData.locality; 
    delete this.personData.isConsent;
    delete this.personData.password;
    //this.setPersonDate()

    this.fileName = this.$t('personarea_select_file')
    
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
      let personDataKey = Object.keys(personData)
  

      delete personData.locality; 
      delete personData.isConsent;
      delete personData.password;

      personDataKey.map(key =>{
        this.personDataRu.push({
          title: this.$t('reg_'+key, RU),
          val: personData[key]
        })
        this.personDataEn.push({
          title: this.$t('reg_'+key, EN),
          val: personData[key]
        })
      })

      
      


    }
  },
  components:{
    mdbContainer, mdbInput,  mdbBtn, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
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