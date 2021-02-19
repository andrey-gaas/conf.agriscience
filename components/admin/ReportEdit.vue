<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="grey user-edit__conteiner lighten-5 d-flex justify-content-center flex-column rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="overflow-y-auto overflow-x-hidden">
        <mdb-row p='3'>
          <mdb-col sm='12' lg='12'>
            <mdb-row class="m-0" p='2' m='b2'>
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
                      <th class='m-0 px-2'>Докладчик</th>
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
                        <mdb-btn class="m-0 p-2" color="warning" @click="startEditAuthor(ind)">
                          <BIconPencilSquare class="icon-size-lg"/>
                        </mdb-btn>
                        <mdb-btn class="m-0 p-2" color="danger" @click="deletAuthor(ind)">
                          <BIconTrashFill class="icon-size-lg"/>
                        </mdb-btn>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="5" class="p-0">
                        <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="createAuthor()">Добавить автора</mdb-btn>
                      </th>
                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>
                <div class="form-group">
                  <label for="nameReport" class="h5">Название доклада</label>
                  <input type="text" id="nameReport" class="form-control"
                    v-model="title"
                  >
                </div>
                <div class="form-group">
                  <label for="Annotations" class="h5">Аннотация</label>
                  <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'
                    v-model="annotations"
                  />
                </div>
                <mdb-btn class="teal lighten-2 m-0" @click="translateReport({from:'ru', to:'en'})">
                  Перевести на английский
                </mdb-btn>
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
                      
                      <th>Edit/ Del.</th>
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
                        <mdb-btn class="m-0 p-2" color="warning" @click="startEditAuthor(ind)">
                          <BIconPencilSquare class="icon-size-lg"/>
                        </mdb-btn>
                        <mdb-btn class="m-0 p-2" color="danger" @click="deletAuthor(ind)">
                          <BIconTrashFill class="icon-size-lg"/>
                        </mdb-btn>
                      </th>
                    </tr>
                    <tr>
                      <th colspan="5" class="p-0">
                        <mdb-btn class="m-1 px-3 py-2 teal lighten-2" @click="createAuthor()">Add author</mdb-btn>
                      </th>
                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>
                <div class="form-group">
                  <label for="nameReport" class="h5">Title of the report</label>
                  <input type="text" id="nameReport" class="form-control"
                    v-model="titleEn"
                  >
                </div>
                <div class="form-group">
                  <label for="Annotations" class="h5">Annotation</label>
                  <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'
                    v-model="annotationsEn"
                  />
                </div>
                <mdb-btn class="teal lighten-2 m-0" @click="translateReport({from:'en', to:'ru'})">
                  Translate on Russian
                </mdb-btn>
              </mdb-col>
            </mdb-row>
            <mdb-row class="m-0" p='2'>
              
              <mdb-col col="12" m='b1'>
              <span class="d-flex h5 mb-2">{{$t('edit_report_extended_theses')}}</span>
              <p class='mb-0'>{{$t('edit_report_add_file')}}</p>
              </mdb-col>
            
              <mdb-col col="12" sm='12' md='8' lg='7'>
                <div class="input-group m-0">
                  <div class="custom-file cursor-pointer">
                    <input type="file" class="custom-file-input " id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                      ref="fileInput"
                      @change="setFileName"
                    >
                    <label class="custom-file-label" for="inputGroupFile01"
                      :class="{
                        input__label_text_ru: ($i18n.locale == 'ru'), 
                        input__label_text_en: ($i18n.locale == 'en'), 
                      }"
                    
                    >{{fileName === '' ? $t('personarea_select_file'): fileName}}</label>
                  </div>
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
                <span class='h6 d-flex red-text'
                  v-if="validData.isCheck && !validData.isFileName"
                >
                  {{$t('edit_report_err_valid_add_file')}}
                </span>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-btn @click="saveReport">
              Cохранить
            </mdb-btn>
            <mdb-btn @click="reportIsChecked">
              Проверен
            </mdb-btn>
            <mdb-btn-group>
              <mdb-btn color="success" @click="approveReport">
                Одобрить
              </mdb-btn>
              <mdb-btn color="danger" @click="failureReport">
                Отказать
              </mdb-btn>
            </mdb-btn-group>
            <mdb-btn @click="closeForm">
              Отмена
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-container>
    <mdb-container
      v-if="isAuthorEdit"
      :class="{editShow: isAuthorEdit}"
    >
      <FormEditAuthor
        :editAuthor="editAuthor"
        :setAuthor="setAuthor"
        :reportEdit="reportEdit"
        :closeForm="closeEditAuthor"
      />
    </mdb-container>
    <mdb-container
      v-if="isAuthorCrate"
      :class="{editShow: isAuthorCrate}"
    >
      <FormEditAuthor
        :editAuthor="editAuthor"
        :setAuthor="setAuthor"
        :reportEdit="reportEdit"
        :closeForm="closeEditAuthor"
      />
    </mdb-container>
    <!-- <transition name="toast">
      <Toast
        v-if="isShowTost"
        :message='toastMessage'
      />
    </transition> -->
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'


import FormEditAuthor from '@/components/admin/EditAuthor';
import Toast from '@/components/Toast';

import { BIcon, BIconCaretDownFill, BIconCaretUpFill, BIconTrashFill, BIconPencilSquare } from 'bootstrap-vue'
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody} from 'mdbvue';

export default {
  props:['closeForm', 'reportEdit', 'todo'],
  data: () => ({
    RU, EN,
    author:[],
    authorEn:[],
    wordFile:'',
    fileName: '',
    title:'',
    titleEn:'',
    annotations:'',
    annotationsEn:'',
    isAuthorEdit: false,
    isAuthorCrate: false,
    validData:{
      isCheck: false,
      isCountAuthor: false,
      isCountSpeaker: false,
      isTitle: false,
      isAnnotation: false,
      isFileName: false,
    },
    editAuthor:{},
  }),
  computed:{
    
  },
  watch:{
    title(){this.reportEdit.title = this.title},
    titleEn(){this.reportEdit.titleEn = this.titleEn},
    annotations(){this.reportEdit.annotations = this.annotations},
    annotationsEn(){this.reportEdit.annotationsEn = this.annotationsEn},
  },
  created(){
    this.fileName = this.reportEdit.fileName ? this.reportEdit.fileName : ''
    this.setAuthor()
    this.title = this.reportEdit.title 
    this.titleEn = this.reportEdit.titleEn 
    this.annotations = this.reportEdit.annotations 
    this.annotationsEn = this.reportEdit.annotationsEn 
    
  
  },
  methods:{
    localeRout,
    async saveReport(){
      if(this.todo === 'edit'){
        await this.$store.dispatch('admin/saveReportEditBD', this.reportEdit)
        this.closeForm()
      }
    },
    closeEditAuthor(){
      this.isAuthorEdit = false
      this.isAuthorCrate = false
    },
    createAuthor(){
      this.isAuthorCrate = true
      this.editAuthor = {
        num: this.reportEdit.speakerList.length,
        email: '',
        isSpeaker: false,
        ru:{
          surname: '',
          name: '',
          patronymic: '',
          position: '',
          organization: '',
        },
        en:{
          surname: '',
          name: '',
          patronymic: '',
          position: '',
          organization: '',
        }
      }
    },
    startEditAuthor(ind){
      this.isAuthorEdit = true
      this.editAuthor = {
        num: this.reportEdit.speakerList[ind].num,
        isSpeaker: this.reportEdit.speakerList[ind].isSpeaker,
        email: this.reportEdit.speakerList[ind].email,
        ru:{
          surname: this.reportEdit.speakerList[ind].surname,
          name: this.reportEdit.speakerList[ind].name,
          patronymic: this.reportEdit.speakerList[ind].patronymic,
          position: this.reportEdit.speakerList[ind].position,
          organization: this.reportEdit.speakerList[ind].organization,
        },
        en:{
          surname: this.reportEdit.speakerListEn[ind].surname,
          name: this.reportEdit.speakerListEn[ind].name,
          patronymic: this.reportEdit.speakerListEn[ind].patronymic,
          position: this.reportEdit.speakerListEn[ind].position,
          organization: this.reportEdit.speakerListEn[ind].organization,
        }
      }
    },
    async reportIsChecked(){
      try {
        await this.$store.dispatch('admin/reportIsChecked')
        this.closeForm()
      } catch (error) {
        aletr('что-то пошло не так, сообщиете программистам')
      }
    },
    validation(){
      let isValid = true
      if( this.author.length > 0 ) this.validData.isCountAuthor = true
      else{ 
        this.validData.isCountAuthor = false
        isValid = false
      }

      let count = this.author.reduce((acc, el) => {
        //Количество докладчиков
        return (el.isSpeaker == true) ? ++acc : acc
      }, 0)

      if( count > 0 ) this.validData.isCountSpeaker = true
      else {
        isValid = false
        this.validData.isCountSpeaker = false
      }

      if( this.title || this.titleEn) this.validData.isTitle = true
      else {
        isValid = false
        this.validData.isTitle = false
      }

      if( this.annotations || this.annotationsEn) this.validData.isAnnotation = true
      else {
        isValid = false
        this.validData.isAnnotation = false
      }

      if( this.fileName !== '') this.validData.isFileName = true
      else{
        isValid = false
        this.validData.isFileName = false
      }

      return isValid

    },
    async failureReport(){
      await this.$store.dispatch('admin/failureReport')
      this.$store.commit('admin/setReportEditStatus', -1)
      
      this.closeForm()
    },
    async approveReport(){
      await this.$store.dispatch('admin/approveReport')
      this.$store.commit('admin/setReportEditStatus', 1)
      this.closeForm()
    },
    async axiosTranslete(textData, {from, to}){
      let res = await this.$axios.post('/translate', {language: {from, to}, fields:textData})
      let result = {}
      let i = 0
      for(let key in textData){
        result[key] = res.data[i]
        i++
      }
      return result
    },
    async translateReport({from, to}){
      if(from === 'en'){
        if( 
            this.reportEdit.titleEn.length > 5000
            || this.reportEdit.annotationsEn.length > 5000
        ){
          console.log('NO NO NO, stop click the button');
          return
        }
      }else{
        if( 
            this.title.length > 5000
            || this.annotations.length > 5000
        ){
          console.log('NO NO NO, прекрати тыкать на кнопку');
          return
        }
      }

      if(from === 'en'){
        let result = await this.axiosTranslete({title:this.titleEn, text:this.annotationsEn}, {from, to})
        this.annotations = result.text
        this.title = result.title
        
      }else{
        let result = await this.axiosTranslete({title:this.title, text:this.annotations}, {from, to})
        this.annotationsEn = result.text
        this.titleEn = result.title
      }

      localStorage.reportTitleEn = this.reportNameEn
      localStorage.reportTextEn = this.reportTextEn
      localStorage.reportTitleRu = this.reportName
      localStorage.reportTexteRu = this.reportText
    },
    setFileName(){
      this.wordFile = this.$refs.fileInput.files[0]
      this.fileName = this.$refs.fileInput.files[0].name
    },
    toggleSpeaker(ind){
      this.reportEdit.speakerList[ind].isSpeaker = !this.reportEdit.speakerList[ind].isSpeaker
      this.reportEdit.speakerListEn[ind].isSpeaker = !this.reportEdit.speakerListEn[ind].isSpeaker
      this.setAuthor()
    },
    setAuthor(){
      this.author = this.reportEdit.speakerList.map(el => {
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
      })
      this.authorEn = this.reportEdit.speakerListEn.map(el => {
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
      })
    
    },
    deletAuthor(ind){
      this.reportEdit.speakerList.splice(ind, 1)
      this.reportEdit.speakerListEn.splice(ind, 1)
      this.setAuthor()
    },
    upAuthor(ind){
      if(ind == 0) return

      const el = {...this.reportEdit.speakerList[ind], num: ind-1}
      this.reportEdit.speakerList[ind-1].num = ind
      this.reportEdit.speakerList.splice(ind-1, 0, el)
      this.reportEdit.speakerList.splice(ind+1, 1)

      const elEn = {...this.reportEdit.speakerListEn[ind], num: ind-1}
      this.reportEdit.speakerListEn[ind-1].num = ind
      this.reportEdit.speakerListEn.splice(ind-1, 0, elEn)
      this.reportEdit.speakerListEn.splice(ind+1, 1)
      this.setAuthor()
    },
    downAuthor(ind){ 
      if(ind == this.reportEdit.speakerList.length-1) return

      const el = {...this.reportEdit.speakerList[ind], num: ind+1}
      this.reportEdit.speakerList[ind+1].num = ind
      this.reportEdit.speakerList.splice(ind+2, 0, el)
      this.reportEdit.speakerList.splice(ind, 1)

      const elEn = {...this.reportEdit.speakerListEn[ind], num: ind+1}
      this.reportEdit.speakerListEn[ind+1].num = ind
      this.reportEdit.speakerListEn.splice(ind+2, 0, elEn)
      this.reportEdit.speakerListEn.splice(ind, 1)
      this.setAuthor()
    },
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
</style>