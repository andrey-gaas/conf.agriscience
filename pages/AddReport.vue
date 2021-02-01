<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" >
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>{{$t('edit_report_report')}}</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col="12" sm='12' md='6' lg='6' class='mb-sm-4 mb-4 mb-lg-0 mb-md-0'
          :class="{'order-3':($i18n.locale == EN)}"
        >
          <mdb-tbl responsiveSm bordered>
            <mdb-tbl-head textWhite class="rounded teal lighten-1">
              <tr>
                <th colspan="5"><h5 class="mb-0">Авторы</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>№</th>
                <th>ФИО</th>
                <th class='m-0 px-0'>Докладчик</th>
                <th>Ред./ Уд.</th>
              </tr>
              <tr
                v-for="(item, ind) of author" :key='ind'
              >
                <th class='th-1 p-0'>
                  <span class="mr-3">{{ind+1}}</span>
                  <mdb-btn-group vertical>
                    <mdb-btn class="m-0 px-2 py-1 teal lighten-2" @click="upAuthor(ind)">
                      <BIconCaretUpFill/>
                    </mdb-btn>
                    <mdb-btn class="m-0 px-2 py-1 teal lighten-2" @click="downAuthor(ind)">
                      <BIconCaretDownFill/>
                    </mdb-btn>
                  </mdb-btn-group>
                </th>
                <th>{{item.DOB}}</th>
                <th class="p-3">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="ind"
                      v-model="item.isSpeaker"
                      @click="toggleSpeaker(ind)"
                    >
                    <label class="custom-control-label size_lg" :for="ind"></label>
                  </div>
                </th>
                <th class="p-2">
                  <mdb-btn class="m-0 p-2" color="warning" @click="startEditAuthor(ind, 'ru')">
                    <BIconPencilSquare class="icon-size-lg"/>
                  </mdb-btn>
                  <mdb-btn class="m-0 p-2" color="danger" @click="deletAuthor(ind)">
                    <BIconTrashFill class="icon-size-lg"/>
                  </mdb-btn>
                </th>
              </tr>
              <tr>
                <th colspan="5" class="p-0">
                  <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="createAuthor('ru')">Добавить автора</mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <div class="form-group">
            <label for="nameReport" class="h5">Название доклада</label>
            <input type="text" id="nameReport" class="form-control"
              v-model="reportName"
            >
          </div>
          <div class="form-group">
            <label for="Annotations" class="h5">Аннотация</label>
            <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'
              v-model="reportText"
            />
          </div>
          
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <mdb-tbl responsiveSm bordered>
            <mdb-tbl-head textWhite class="rounded teal lighten-1">
              <tr>
                <th colspan="5"><h5 class="mb-0">Authors</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th class="">№</th>
                <th>Full name</th>
                <th class='m-0 px-2'>Speaker</th>
                
                <th>Edit/ del.</th>
              </tr>
              <tr
                v-for="(item, ind) of authorEn" :key='ind'
              >
                <th class='p-0 th-1'>
                  <span class='mr-3'>{{ind+1}}</span>
                  <mdb-btn-group vertical>
                    <mdb-btn class="m-0 px-2 py-1 teal lighten-2" @click="upAuthor(ind)">
                      <BIconCaretUpFill/>
                    </mdb-btn>
                    <mdb-btn class="m-0 px-2 py-1 teal lighten-2" @click="downAuthor(ind)">
                      <BIconCaretDownFill/>
                    </mdb-btn>
                  </mdb-btn-group>
                </th>
                <th>{{item.DOB}}</th>
                <th class="p-3">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="ind+'en'"
                      v-model="item.isSpeaker"
                      @click="toggleSpeaker(ind)"
                    >
                    <label class="custom-control-label size_lg" :for="ind+'en'"></label>
                  </div>
                </th>
              
                <th class="p-2">
                  <mdb-btn class="m-0 p-2" color="warning" @click="startEditAuthor(ind, 'en')">
                    <BIconPencilSquare class="icon-size-lg"/>
                  </mdb-btn>
                  <mdb-btn class="m-0 p-2" color="danger" @click="deletAuthor(ind)">
                    <BIconTrashFill class="icon-size-lg"/>
                  </mdb-btn>
                </th>
              </tr>
              <tr>
                <th colspan="5" class="p-0">
                  <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="createAuthor('en')">Add author</mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <div class="form-group">
            <label for="nameReport" class="h5">Title of the report</label>
            <input type="text" id="nameReport" class="form-control"
              v-model="reportNameEn"
            >
          </div>
          <div class="form-group">
            <label for="Annotations" class="h5">Annotation</label>
            <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'
              v-model="reportTextEn"
            />
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <span class='h6 d-flex red-text'
            v-if="validData.isCheck && !validData.isCountAuthor"
          >
            {{$t('edit_report_enter_author')}}
          </span>
          <span class='h6 d-flex red-text'
            v-if="validData.isCheck && !validData.isCountSpeaker"
          >
            {{$t('edit_report_enter_speaker')}}
          </span>
          <span class='h6 d-flex red-text'
            v-if="validData.isCheck && !validData.isTitle"
          >
            {{$t('edit_report_enter_title_report')}}
          </span>
          <span class='h6 d-flex red-text'
            v-if="validData.isCheck && !validData.isAnnotation"
          >
            {{$t('edit_report_add_annotation')}}
          </span>
          <mdb-btn class="teal lighten-2" @click="saveReport()">
            {{$t('edit_report_save')}}
          </mdb-btn>
          <mdb-btn class="teal lighten-2" @click="cancelReport()">
            {{$t('edit_report_cancel')}}
          </mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container
      v-if="isAuthorEdit"
      :class="{editShow: isAuthorEdit}"
    >
      <FormEditAuthor
        :editAuthor='editAuthor'
        :closeEdit='closeEdit'
        :textBtn='$t("edit_report_save")'
        :loc='locale'
      />
    </mdb-container>
    <mdb-container
      v-if="isAuthorCrate"
      :class="{editShow: isAuthorCrate}"
    >
      <FormEditAuthor
        :editAuthor='crateAuthor'
        :closeEdit='closeCreate'
        :textBtn='$t("edit_author_add")'
        :loc='locale'
      />
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
import {localeRout} from '@/assets/utils'

import FormEditAuthor from '@/components/FormEditAuthor';
import Toast from '@/components/Toast';
import { BIcon, BIconCaretDownFill, BIconCaretUpFill, BIconTrashFill, BIconPencilSquare } from 'bootstrap-vue'
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbIcon  } from 'mdbvue';



export default {
  name: "AddReport",
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data: () => ({
    RU, EN,
    author:[],
    authorEn:[],
    isAuthorCrate: false,
    isAuthorEdit: false,
    editAuthor: { 
      surname: '',
      name: '',
      patronymic: '',
      organization: '',
      position: '',
      email: '',
    },
    crateAuthor: { 
      surname: '',
      name: '',
      patronymic: '',
      organization: '',
      position: '',
      email: '',
    },
    reportText:'',
    reportName:'',
    reportTextEn:'',
    reportNameEn:'',
    locale:'',
    countSpeakers: 0,
    validData:{
      isCheck: false,
      isCountAuthor: false,
      isCountSpeaker: false,
      isTitle: false,
      isAnnotation: false,
    },
    toastMessage: 'asdf',
    isShowTost: false,

  }),
  computed:{
    speakers(){
      return this.$store.getters.getSpeakers
    },
    speakersEn(){
      return this.$store.getters.getSpeakersEn
    },
  },
  watch:{
    speakers(){
      this.setAuthor()

      this.validation()
    },
    speakersEn(){
      this.setAuthor()

      this.validation()
    },
    reportText(){
      this.validation()
    },
    reportName(){
      this.validation()
    },
    reportTextEn(){
      this.validation()
    },
    reportNameEn(){
      this.validation()
    },
  },
  created(){
    this.setAuthor()
    this.setReport()
  },
  mounted(){
    
  },
  methods:{
    localeRout,
    showTost(text){
      this.$store.commit('setToastMsg', text)
      this.isShowTost = true
      setTimeout(()=>{this.isShowTost = false}, 3000)
    },
    cancelReport(){
      this.$store.commit('cleanDataReport')
      this.$router.push(this.localeRout('/personarea'))
    },
    async saveReport(){
      this.validData.isCheck = true
      if(!this.validation()) return
      
      const ind = this.$store.getters.getReportInd
      const speakerList = this.$store.getters.getSpeakers
      const speakerListEn = this.$store.getters.getSpeakersEn
      const report = {
        title: this.reportName,
        titleEn: this.reportNameEn,
        annotations: this.reportText,
        annotationsEn: this.reportTextEn,
        status: 0,
        speakerList,
        speakerListEn,
      }
      
      try {
        if(ind == this.$store.getters.getReportList.length){
          await this.$store.dispatch('addReportBD', {report})
        }else{
          await this.$store.dispatch('editReportBD', {report})
        }
        this.$store.commit('saveReport', {report, ind})
        this.$router.push(this.localeRout('/personarea'))
      } catch (e) {
        this.showTost(e.message)
      }
      
    },
    howCountSpeaker(){
      let count = this.author.reduce((acc, el) => {
        return (el.isSpeaker == true) ? ++acc : acc
      }, 0)
      return count
    },
    toggleSpeaker(ind){
      this.$store.commit('toggleSpeaker', ind)

      this.setAuthor()

      this.validation()
    },
    closeEdit(){
      this.isAuthorEdit = false
    },
    closeCreate(){
      this.isAuthorCrate = false
    },
    setAuthor(){
      this.author = this.speakers.map((el, ind)=>{
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
      })
      this.authorEn = this.speakersEn.map((el, ind)=>{
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
      })
    },
    setReport(){
      this.reportText = this.$store.getters.getReportText
      this.reportName = this.$store.getters.getReportName
      this.reportTextEn = this.$store.getters.getReportTextEn
      this.reportNameEn = this.$store.getters.getReportNameEn
    },
    startEditAuthor(ind, loc){
      this.locale = loc
      if(loc == 'en'){
        const speakers = this.$store.getters.getSpeakersEn
        this.editAuthor = speakers[ind]
        this.isAuthorEdit = true
      }else{
        const speakers = this.$store.getters.getSpeakers
        this.editAuthor = speakers[ind]
        this.isAuthorEdit = true
      }
      
      
    },
    deletAuthor(ind){
      this.$store.commit('deletSpeaker', ind)
    },
    upAuthor(ind){
      this.$store.commit('upSpeaker', ind)
    },
    downAuthor(ind){
      this.$store.commit('downSpeaker', ind)
    },
    createAuthor(loc){
      this.locale = loc
      this.isAuthorCrate = true
    },
    validation(){
      let isValid = true
      if( this.author.length > 0 ) this.validData.isCountAuthor = true
      else{ 
        this.validData.isCountAuthor = false
        isValid = false
      }

      if( this.howCountSpeaker() > 0 ) this.validData.isCountSpeaker = true
      else {
        isValid = false
        this.validData.isCountSpeaker = false
      }

      if( this.reportName || this.reportNameEn) this.validData.isTitle = true
      else {
        isValid = false
        this.validData.isTitle = false
      }

      if( this.reportText || this.reportTextEn) this.validData.isAnnotation = true
      else {
        isValid = false
        this.validData.isAnnotation = false
      }

      return isValid

    },
    log(el){
      console.log(el);
    }
  },
  components:{
    FormEditAuthor, Toast,
    BIcon, BIconCaretDownFill, BIconCaretUpFill, BIconTrashFill, BIconPencilSquare,
    mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
  }
};
</script>

<style lang="scss">
.editShow{
  min-width: 0px;
  width: 0;
  padding: 0;
  margin: 0;
  z-index: 1010;
}
.th-1{
  width: 70px;
  text-align: right;
}
.size_lg{
  &::before{
    height: 20px;
    width: 20px;
  }
  &::after{
    height: 20px;
    width: 20px;
  }
}
.icon-size-lg{
  width: 20px;
  height: 20px;
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