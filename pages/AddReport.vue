<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" >
      <mdb-row class="m-0 bg-primary" p='3'>
        <h2 class="mb-0  white-text"><strong>Доклад</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col="12" sm='12' md='6' lg='6' class='mb-sm-4 mb-4 mb-lg-0 mb-md-0'
          :class="{'order-3':($i18n.locale == EN)}"
        >
          <mdb-tbl responsiveSm bordered>
            <mdb-tbl-head color="blue" textWhite class="rounded">
              <tr>
                <th colspan="5"><h5 class="mb-0">Авторы</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>№</th>
                <th>ФИО</th>
                <th class='m-0 px-0'>Докладчик</th>
                <th>Ред./ Удал.</th>
              </tr>
              <tr
                v-for="(item, ind) of author" :key='ind'
              >
                <th class='th-1 p-0'>
                  <span class="mr-3">{{ind+1}}</span>
                  <mdb-btn-group vertical>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="upAuthor(ind)">
                      <BIconCaretUpFill/>
                    </mdb-btn>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="downAuthor(ind)">
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
                  <mdb-btn class="m-1 px-3 py-2" color='primary' @click="createAuthor('ru')">Добавить автора</mdb-btn>
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
            <mdb-tbl-head color="blue" textWhite class="rounded">
              <tr>
                <th colspan="5"><h5 class="mb-0">Авторы</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th class="">№</th>
                <th>ФИО</th>
                <th class='m-0 px-2'>Докладчик</th>
                
                <th>Ред./ Удал.</th>
              </tr>
              <tr
                v-for="(item, ind) of authorEn" :key='ind'
              >
                <th class='p-0 th-1'>
                  <span class='mr-3'>{{ind+1}}</span>
                  <mdb-btn-group vertical>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="upAuthor(ind)">
                      <BIconCaretUpFill/>
                    </mdb-btn>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="downAuthor(ind)">
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
                  <mdb-btn class="m-1 px-3 py-2" color='primary' @click="createAuthor('en')">Добавить автора</mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <div class="form-group">
            <label for="nameReport" class="h5">Название доклада</label>
            <input type="text" id="nameReport" class="form-control"
              v-model="reportNameEn"
            >
          </div>
          <div class="form-group">
            <label for="Annotations" class="h5">Аннотация</label>
            <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'
              v-model="reportTextEn"
            />
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          <mdb-btn class="" color="primary" @click="saveReport()">
            Сохранить
          </mdb-btn>
          <mdb-btn class="" outline="primary" @click="cancelReport()">
            Отмена
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
        :textBtn='"Сохранить"'
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
        :textBtn='"Добавить"'
        :loc='locale'
      />
    </mdb-container>
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import FormEditAuthor from '@/components/FormEditAuthor';
import { BIcon, BIconCaretDownFill, BIconCaretUpFill, BIconTrashFill, BIconPencilSquare } from 'bootstrap-vue'
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbIcon  } from 'mdbvue';



export default {
  name: "AddReport",
  layout: 'EmptyLayout',
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
    },
    speakersEn(){
      this.setAuthor()
    }
  },
  created(){
    this.setAuthor()
    this.setReport()
  },
  mounted(){
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    cancelReport(){
      this.$store.commit('cleanDataReport')
      this.$router.push(this.localeRout('/personarea'))
    },
    saveReport(){
      const ind = this.$store.getters.getReportInd
      const speakerList = this.$store.getters.getSpeakers
      const report = {
        title: this.reportName,
        annotations: this.reportText,
        status: 0,
        speakerList
      }
      
      this.$store.commit('saveReport', {report, ind})

      this.$router.push(this.localeRout('/personarea'))
    },
    toggleSpeaker(ind){
      this.$store.commit('toggleSpeaker', ind)

      this.setAuthor()
    },
    closeEdit(){
      this.isAuthorEdit = false
    },
    closeCreate(){
      this.isAuthorCrate = false
    },
    setAuthor(){
      //console.log(this.speakers);
      this.author = this.speakers.map((el, ind)=>{
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic[0] ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
      })
      this.authorEn = this.speakersEn.map((el, ind)=>{
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic[0] ? el.patronymic[0]+'.': ''}`,
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

    log(el){
      console.log(el);
    }
  },
  components:{
    FormEditAuthor, 
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
</style>