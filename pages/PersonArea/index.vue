<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
    <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"
        v-if="loading"
      >
        <span class="sr-only">Loading...</span>
    </div>
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" 
      v-if="!loading"
    >
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>{{$t('personarea_person_area')}}</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-row class="mb-1 col-12 mx-0 px-0">
          <mdb-col col="12" sm='12' md='6' lg='6' class='mb-sm-4 mb-4 mb-lg-0 mb-md-0'>
            <div class="person__img">
              <div class="person-card_img rounded-circle shadow-lg my-3 mx-0" 
                :style="{'background-image': `url(${imgSrc})`}">
              </div>
            </div>
            <span>{{$t('personarea_download_photo')}}</span>
            <div class="input-group mb-3">
              <div class="custom-file cursor-pointer">
                <input type="file" class="custom-file-input " aria-describedby="inputGroupFileAddon01"
                  ref="fileInput"
                  id="upload-avatar"
                  name="avatar"
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
            <mdb-btn class="m-0 teal lighten-2"
              @click="submitFile"
            >{{$t('personarea_download')}}</mdb-btn>
            <span
              class="h6 d-flex my-2 red-text"
              v-if="!isEmailСonfirm"
            >
              {{$t('personarea_no_confirm')}}
            </span>
            <span
              class="h6 d-flex my-2 green-text"
              v-if="isEmailСonfirm"
            >
              {{$t('personarea_confirm')}}
            </span>
            <nuxt-link class="h6 d-flex my-2"
              v-if="!isEmailСonfirm"
              :to="localeRout('/PersonArea/Email')"
            >{{$t('personarea_not_come_letter')}}</nuxt-link>
          </mdb-col>
          <mdb-col col="12" sm='12' md='6' lg='6' class=''>
            <mdb-tbl responsiveSm bordered>
              <mdb-tbl-head textWhite class="rounded teal lighten-1">
                <tr>
                  <th colspan="4"><h5 class="mb-0">{{$t('personarea_report_requests')}}</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr>
                  <th>{{$t('personarea_title_report')}}</th>
                  <th>{{$t('personarea_status')}}</th>
                  <th>{{$t('personarea_edit')}}</th>
                </tr>
                <tr
                  v-for="(item, key) in personReport" :key='key'
                >
                  <th class="p-2 align-middle">{{item.title}}</th>
                  
                  <th class="p-2 align-middle">
                    <BIconXSquareFill
                      class="report__status_icon red-text"
                      v-if="item.status == -1"
                    />
                    <BIconCheckSquare
                      class="report__status_icon green-text"
                      v-if="item.status == 1"
                    />
                    <BIconQuestionSquare
                      class="report__status_icon amber-text"
                      v-if="item.status == 0"
                    />
                  </th>
                  <th class="p-0 align-middle">
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2"
                      v-if="item.status !== 1 && item.status !== undefined"
                      @click="editReport(item.ind)"
                    >
                      <BIconPencilSquare/>
                    </mdb-btn>
                  </th>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl>
            <mdb-btn class="mt-0 mb-4 mx-0 teal lighten-2"
              @click="addReport()"
              :class="{'disabled':!isEmailСonfirm}"
            >
              {{$t('personarea_apply')}}
            </mdb-btn>
            <span
              class='d-flex grey-text'
              v-if="!isEmailСonfirm"
            >{{$t('personarea_add_report_not_emeil')}}
            </span>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-0 col-12 mx-0 px-0" >
          <mdb-col col='12' class="mb-4">

            <h4 class="mb-2 mt-0">{{$t('personarea_profile')}}</h4>
            <nuxt-link :to="localeRout('/personArea/editprofile')" 
              class="mt-0 mb-0 mx-0 btn teal lighten-2 text-decoration-none ripple-parent text-white"
            >
              {{$t('personarea_edit_profile')}}
            </nuxt-link>
          </mdb-col>
          <mdb-col col="12" sm='12' md='6' lg='6' class=''
            :class="{'order-3':($i18n.locale == EN)}"
          >
            <mdb-tbl responsiveSm>
              <mdb-tbl-head textWhite class="rounded teal lighten-1">
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
                  <th>{{$t('personarea_about_me_ru')}}</th>
                  <th v-if="personAboutMeRu != '' && personAboutMeRu != undefined">{{personAboutMeRu}}</th>
                  <th v-else-if="isEditAboutMeRu">
                    <mdb-input type="textarea" class="m-0 p-0" outline
                      :rows="5" 
                      v-model="aboutMeRu"
                      ref='textareaRu'
                    />
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="setPersonAboutMe(RU)">{{$t('personarea_save_ru')}}</mdb-btn>
                  </th>
                  <th v-else class="p-0">
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="startEditAboutMe(RU)">{{$t('personarea_add_about_me_ru')}}</mdb-btn>
                  </th>
                </tr>
                <!-- <tr
                  v-if="personAboutMeRu != '' && personAboutMeRu != undefined"
                >
                  <th class="p-0" colspan="2">
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="translateAboutMe({from:'ru', to:'en'}, personAboutMeRu)">
                      Перевести о себе
                    </mdb-btn>
                  </th>
                </tr> -->
              </mdb-tbl-body>
            </mdb-tbl>
          </mdb-col>
          <mdb-col col="12" sm='12' md='6' lg='6' p='' class=''>
            <mdb-tbl responsiveSm>
              <mdb-tbl-head textWhite class="teal lighten-1">
                <tr>
                  <th colspan="2"><h5 class="mb-0">{{$t('personarea_profiledata_en')}}</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr
                  v-for="(item, key) in personDataEn" :key='key'
                >
                  <th>{{$t('personarea_'+key+'_'+EN)+':'}}</th>
                  <th>{{item}}</th>
                </tr>
                <tr>
                  <th>{{$t('personarea_about_me_en')}}</th>
                  <th v-if="personAboutMeEn != '' && personAboutMeEn != undefined">{{personAboutMeEn}}</th>
                  <th v-else-if="isEditAboutMeEn">
                    <mdb-input type="textarea" class="m-0 p-0" outline
                      :rows="5" 
                      v-model="aboutMeEn"
                      ref='textareaEn'
                    />
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="setPersonAboutMe(EN)">{{$t('personarea_save_en')}}</mdb-btn>
                  </th>
                  <th v-else class="p-0">
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="startEditAboutMe(EN)">{{$t('personarea_add_about_me_en')}}</mdb-btn>
                  </th>
                </tr>
                <!-- <tr
                  v-if="personAboutMeEn != '' && personAboutMeEn != undefined"
                >
                  <th class="p-0" colspan="2">
                    <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="translateAboutMe({from:'en', to:'ru'}, personAboutMeEn)">
                      translate about me
                    </mdb-btn>
                  </th>
                </tr> -->
              </mdb-tbl-body>
            </mdb-tbl>
            <mdb-btn
              @click="testAxios"
            >
              Тест
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </mdb-row>
    </mdb-container>
    <transition name="toast">
      <Toast
        v-if="isShowTost"
        :message='toastMessage'
      />
    </transition>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout, transliterate, getCookie} from '@/assets/utils'

import Toast from '@/components/Toast';
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import { BIcon, BIconPencilSquare, BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare,   } from 'bootstrap-vue'


export default {
  name: "PersonArea",
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data: () => ({
    RU, EN,
    personData:{},
    personDataEn:{},
    imgFile: '',
    personAboutMeRu:'',
    personAboutMeEn:'',
    personReport:[{title:'Нет активных заявок', ind:'',}],
    fileName: '',
    isEditAboutMeRu: false,
    isEditAboutMeEn: false,
    aboutMeRu:'',
    aboutMeEn:'',
    isShowTost: false,
    loading: true,
  }),
  computed:{
    
  },
  async created(){
    this.$store.commit('setCookie')
    
    if(!this.$store.getters.getLoadData){
      try {
        await this.$store.dispatch('fetchPersonData')
        await this.$store.dispatch('fetchPersonReports')
        this.$store.commit('toggleLoadData', true)
      } catch (e) {
        this.showTost(e.message)
      }
    }
    this.setData()
    this.setReport()
  },
  computed:{
    isEmailСonfirm(){
      return this.$store.getters.getEmailСonfirm
    },
    imgSrc(){
      return this.$store.getters.getImgSrc
    },
    toastMessage(){
      return this.$store.getters.getToastMsg
    },
  },
  mounted(){
    this.loading = false
  },
  methods:{
    testAxios(){
      console.log('in test axios');
      this.$store.dispatch('fetchAllReports')
    },
    localeRout, transliterate, getCookie,
    showTost(text){
      this.$store.commit('setToastMsg', text)
      this.isShowTost = true
      setTimeout(()=>{this.isShowTost = false}, 3000)
    },
    async translateAboutMe({from, to}, textData){
      try {
        let res = await this.$axios.post('/translate', {language: {from, to}, fields:{aboutMe:textData}})
        if(to == 'en' && res.data){
          this.$store.dispatch('sevePersonAboutMeBD', {aboutMeEn: res.data[0]})
          this.$store.commit('setPersonAboutMe', {aboutMe:res.data[0], locale:to })
          this.personAboutMeEn = res.data[0]
        }else{
          this.$store.dispatch('sevePersonAboutMeBD', {aboutMe: res.data[0]})
          this.$store.commit('setPersonAboutMe', {aboutMe:res.data[0], locale:to })
          this.personAboutMeRu = res.data[0]
        }
      } catch (error) {
        
      }
      
    },
    addReport(){
      const speakerPerson = {
        surname:this.personData.surname,
        name:this.personData.name,
        patronymic:this.personData.patronymic,
        position:this.personData.position,
        organization:this.personData.organization,
        email:this.personData.email,
        num: 0,
        isSpeaker: true,
      }
      const speakerPersonEn = {
        surname:this.personDataEn.surname,
        name:this.personDataEn.name,
        patronymic:this.personDataEn.patronymic,
        position:this.personDataEn.position,
        organization:this.personDataEn.organization,
        email:this.personDataEn.email,
        num: 0,
        isSpeaker: true,
      }
      this.$store.commit('cleanDataReport')
      this.$store.commit('setEditReport', this.$store.getters.getReportList.length);
      this.$store.commit('addSpeaker', {speakerPerson, speakerPersonEn});
      //this.$store.commit('logState');
      this.$router.push(this.localeRout('/personArea/addreport'))
    },
    localize(){

      if(this.$i18n.locale == 'en'){
        this.personData = {...this.personDataEn}
        
        for(let el in this.personData){
          if( (el == 'surname') || (el == 'name') || (el == 'patronymic')){
            this.personData[el] = this.transliterate()(this.personData[el], true)
          } 
        }
        this.$store.commit('setPersonData', this.personData);
      }else{
        this.personDataEn = {...this.personData}
        for(let el in this.personDataEn){
          if( (el == 'surname') || (el == 'name') || (el == 'patronymic')){
            this.personDataEn[el] = this.transliterate()(this.personDataEn[el])
          } 
        }
        this.$store.commit('setPersonDataEn', this.personDataEn);
      }
    },
    editReport(ind){
      this.$store.commit('setEditReport', ind);
      this.$router.push(this.localeRout('/personArea/addreport'))
    },
    setReport(){
      const reportList = this.$store.getters.getReportList,
            reportListEn = this.$store.getters.getReportListEn;
      
      if( reportList.length == 0){this.personReport[0].title = this.$t('personarea_no_apply') }
      else{
        this.personReport.pop()
        for(let i = 0; i < reportList.length; i++){
          if(this.$i18n.locale == 'en'){
            if(reportListEn[i].title){
              this.personReport.push({
                title: reportListEn[i].title,
                status: reportListEn[i].status,
                ind: i,
              })
            }else{
              this.personReport.push({
                title: reportList[i].title,
                status: reportList[i].status,
                ind: i,
              })
            }
          }else{
            if(reportList[i].title){
              this.personReport.push({
                title: reportList[i].title,
                status: reportList[i].status,
                ind: i,
              })
            }else{
              this.personReport.push({
                title: reportListEn[i].title,
                status: reportListEn[i].status,
                ind: i,
              })
            }
          }
        }
      }
    },
    submitFile(){
      if (!this.imgFile) {
        return alert('Сначала добавьте картинку в форму выше');
      }

      const formData = new FormData();
      formData.append('avatar', this.imgFile, this.fileName);

      this.$axios.post(
        '/user/avatar',
        formData,
        { headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': this.$store.getters.getCookie.token,
        }},
      )
        .then(result => {
          //console.log(result);
        })
        .catch(({ response }) => {
          alert(response.data);
        });
    },
    setFileName(){
      this.imgFile = this.$refs.fileInput.files[0]
      this.fileName = this.$refs.fileInput.files[0].name
    },
    setData(){
      this.personAboutMeRu = this.$store.getters.getPersonAboutMeRu
      this.personAboutMeEn = this.$store.getters.getPersonAboutMeEn
      this.personData = {...this.$store.getters.getPersonData}
      this.personDataEn = {...this.$store.getters.getPersonDataEn}
      //this.localize()

      delete this.personData.isEmailConfirmed;
      delete this.personData.avatar;
    
      delete this.personDataEn.isEmailConfirmed;
      delete this.personDataEn.avatar;

      if(this.$i18n.locale == 'ru'){
        delete this.personDataEn.telephone
        delete this.personDataEn.email
      }else{
        delete this.personData.telephone
        delete this.personData.email
      }

      this.fileName = this.$t('personarea_select_file')
    },
    startEditAboutMe(loc){
      if(loc == 'ru'){
        this.isEditAboutMeRu = true
        
        setTimeout(() => {
          this.$refs.textareaRu.focus()
        }, 1);
      }
      else{ 
        this.isEditAboutMeEn = true
        
        setTimeout(() => {
          this.$refs.textareaEn.focus()
        }, 1);
        
      }
    },
    async setPersonAboutMe(loc){
      try {
        if(loc == 'ru'){ this.personAboutMeRu = this.aboutMeRu
          await this.$store.dispatch('sevePersonAboutMeBD', {aboutMe: this.aboutMeRu, aboutMeEn: this.personAboutMeEn})
          this.$store.commit('setPersonAboutMe', {aboutMe: this.aboutMeRu, locale:loc});
          this.isEditAboutMeRu = false
        }
        else{ this.personAboutMeEn = this.aboutMeEn
          await this.$store.dispatch('sevePersonAboutMeBD', {aboutMe: this.personAboutMeRu, aboutMeEn: this.aboutMeEn})
          this.$store.commit('setPersonAboutMe', {aboutMe: this.aboutMeEn, locale:loc});
          this.isEditAboutMeEn = false
        }
      } catch (e) {
        this.showTost(e.message)
      }
      
    }
  },
  components:{
    Toast,
    BIconPencilSquare, BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare, 
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
      content:'Обзор...';
      cursor: pointer;
    }
  }
  .input__label_text_en{
    &::after{
      content:'Survey...';
      cursor: pointer;
    }
  }
  .report__status_icon{
    height: 25px;
    width: 25px;
    
  }

  .toast-enter ,.toast-leave-to{
    transform: translateY(-100%);
    transition: all .3s ease;
    opacity: 0;
  }
  .toast-enter-to, .toast-leave{
    transform: translateY(0);
    transition: all .3s ease;
    opacity: 1;
  }
</style>