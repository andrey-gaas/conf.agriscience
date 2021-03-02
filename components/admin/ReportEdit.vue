<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="grey overflow-y-auto report-edit__form lighten-5 d-flex justify-content-center flex-column rounded-lg overflow-hidden" p="0" m='t4'>
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

                <mdb-btn tag="a" role="button" class="teal lighten-2 mx-0 white-text" size='sm'
                  target="_blank"
                  v-if="todo === 'edit'"
                  :href="reportEdit.url"
                >Скачать</mdb-btn>
              </mdb-col>
              <mdb-col col='12' m="t2">
                <span class="d-flex" v-if="todo === 'edit'">Почта: {{reportEdit.email}}</span>
                <mdb-input size="sm" m='y2'
                  type="email"
                  v-if="todo === 'create'"
                  label="E-mail" 
                  v-model="email" 
                />
              </mdb-col>
            </mdb-row>
            <mdb-row class="m-0" p='x2'>
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
                <span class='h6 d-flex red-text'
                  v-if="validData.isCheck && !validData.isDocx"
                >
                  Файл должен быть в формате .docx
                </span>
                <span class='h6 d-flex red-text'
                  v-if="$v.email.$invalid && $v.email.$dirty"
                >
                  Ошибка в поле E-mail
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
            <mdb-btn @click="reportIsChecked" v-if="todo !== 'create'">
              Проверен
            </mdb-btn>
            <mdb-btn @click="hideReport" v-if="todo !== 'create'">
              Скрыть
            </mdb-btn>
            <mdb-btn-group  v-if="todo !== 'create'">
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  props:['closeForm', 'reportEdit', 'todo', 'appDataReportRows', 'reportRows'],
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
    email:'',
    validData:{
      isCheck: true,
      isCountAuthor: true,
      isCountSpeaker: true,
      isTitle: true,
      isAnnotation: true,
      isFileName: true,
      isEmail:true,
      isDocx: true,
    },

    editAuthor:{},
    QuestionSquare:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="question square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-question-square report__status_icon amber-text b-icon bi"><g data-v-2730f04a=""><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path></g></svg>',
    XSquareFill:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="x square fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-x-square-fill report__status_icon red-text b-icon bi"><g data-v-2730f04a=""><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path></g></svg>',
    CheckSquare:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-check-square report__status_icon green-text b-icon bi"><g data-v-2730f04a=""><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path></g></svg>',
  }),
  validations:{
    email:{required, email}
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
    hideReport(){
      this.$store.dispatch('admin/hideReport')
      this.closeForm()
    },
    async saveReport(){

      if(!this.validation()) return

      if(this.todo === 'edit'){
        let userId = null
        let userList = this.$store.getters['admin/getUsersList']

        for(let el of userList){
          if(el.email === this.reportEdit.email) {userId = el.id; break}
        }
        
        if(userId === null){
          alert('Такой E-mail не найден')
          return
        }
        
        try {
          await this.$store.dispatch('admin/saveReportEditBD', this.reportEdit)
          if(this.fileName !== ''){
            if(this.wordFile !== ''){
              const fileDoc = new FormData();
              await fileDoc.append('word', this.wordFile, this.fileName);
              await this.$axios.post(
                  `/admin/reports/file/${userId}/${this.reportEdit.id}`, 
                  fileDoc,
                  { headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': this.$store.getters.getCookie.token,
                  }}
                )
            }
          }else{
            const fileDoc = new FormData();
            await fileDoc.append('word', this.wordFile, this.fileName);
            await this.$axios.post(
                `/admin/reports/file/${userId}/${this.reportEdit.id}`, 
                fileDoc,
                { headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': this.$store.getters.getCookie.token,
                }}
              )
          }
          this.appDataReportRows(this.reportEdit)
          this.closeForm()
        } catch (error) {
          alert('Что-то пошло не так', error)
          return
        }
        
      }
      if(this.todo === 'create'){
        this.$v.email.$touch()
        if(this.$v.email.$invalid) return

        let userId = null
        let userList = this.$store.getters['admin/getUsersList']

        for(let el of userList){
          if(el.email === this.email) {userId = el.id; break}
        }

        if(userId === null){
          alert('Такой E-mail не найден')
          return
        }
        this.reportEdit.email = this.email
        this.reportEdit.fileName = this.fileName

        let id = this.reportRows[this.reportRows.length - 1].id + 1

        //Поиск пути
        let path = window.$nuxt,
            pathStr = '';
        function setPath(path, pathStr, ind){
          if(path.$children[ind].startEditReport) return pathStr + `.$children[${ind}]`
          if(path.$children[ind+1] && (path.$children[ind].$children.length > 0)){
            return setPath(path, pathStr, ind+1) || setPath(path.$children[ind], pathStr+`.$children[${ind}]`, 0)
          }
          if(path.$children[ind+1]){ return setPath(path, pathStr, ind+1)}
          if(path.$children[ind].$children.length > 0){ return setPath(path.$children[ind], pathStr+`.$children[${ind}]`, 0)}
          return null
        };
        pathStr = setPath(path, 'window.$nuxt', 0)
        //---

        let arrItem = {
          id: id,
          title: this.reportEdit.title,
          email: this.reportEdit.email,
          status: this.reportEdit.status == 1 ? this.CheckSquare : this.reportEdit.status == 0 ? this.QuestionSquare : this.XSquareFill,
          isReportChecked: this.reportEdit.isReportChecked ? this.CheckSquare : this.XSquareFill,
          open: `<button data-v-bc7807ae="" type="button" onclick="${pathStr}.startEditReport(${id})" class="btn btn-default btn-sm ripple-parent m-0" data-v-2730f04a="">Откр</button>`,
        }
        try {
          await this.$store.dispatch('admin/createReportBD', this.reportEdit)
          if(this.wordFile !== ''){
            const fileDoc = new FormData();
            await fileDoc.append('word', this.wordFile, this.fileName);

            await this.$axios.post(
                `/admin/reports/file/${userId}/${id}`, 
                fileDoc,
                { headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': this.$store.getters.getCookie.token,
                }}
              )
            }else{
              alert('Доавьте файл с расширенными тезисами')
            }
        } catch (error) {
          alert('Упс', error)
          return
        }
        this.$set(this.reportRows, this.reportRows.length, arrItem)
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

        this.reportEdit.isReportChecked = true,
        this.appDataReportRows(this.reportEdit)

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

      //Количество докладчиков
      let count = this.author.reduce((acc, el) => {
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
      if( this.fileName.slice(-5) === '.docx') this.validData.isDocx = true
      else{
        isValid = false
        this.validData.isDocx = false
      }
      return isValid

    },
    async failureReport(){
      this.reportEdit.status = -1
      this.appDataReportRows(this.reportEdit)
      await this.$store.dispatch('admin/failureReport')
      //this.$store.commit('admin/setReportEditStatus', -1)
      this.closeForm()
    },
    async approveReport(){
      this.reportEdit.status = 1
      this.appDataReportRows(this.reportEdit)
      await this.$store.dispatch('admin/approveReport')
      //this.$store.commit('admin/setReportEditStatus', 1)
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
.report-edit__form{
  max-height: 98vh;
}
</style>