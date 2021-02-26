<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
    <mdb-container class="grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0">
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>Админка</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col='12' class='justify-content-between d-flex p-0'>
          <mdb-btn-group m='0'>
            <mdb-btn m='0'
              @click='changeCollection("R")'
            >Доклады</mdb-btn>
            <mdb-btn m='0'
              @click='changeCollection("U")'
            >Люди
            </mdb-btn>
          </mdb-btn-group>
          <mdb-btn-group m='0'>
            <mdb-btn m='0'
              v-if="isShowReports"
              @click='createReport()'
            >Новый доклад</mdb-btn>
            <mdb-btn m='0'
              v-if="isShowUsers"
              @click='createUser()'
            >Новый пользователь
            </mdb-btn>
          </mdb-btn-group>
          <div class="filter d-flex align-content-center align-items-center">
            <mdb-btn-group m='0'>
              <mdb-btn m='0'
                @click='appData'
              >Обновить
              </mdb-btn>
              <mdb-btn m='0'
                @click='isShowFilter =!isShowFilter'
              >Фильтры
              </mdb-btn>
            </mdb-btn-group>
            <div class="filter__drop-menu"
              v-if="isShowFilter && isShowUsers"
            >
              <div class="filter__drop_item d-flex">
                <span class="m-2 h6 w-50 d-flex">
                  Почта:
                </span>
                <select class="browser-default custom-select"
                  v-model="filterDataUser.isEmailConfirmed"
                >
                  <option :value="undefined" selected>Неважно</option>
                  <option :value="true">Подтверждена</option>
                  <option :value="false">Не подтверждена</option>
                </select>
              </div>
              <div class="filter__drop_item d-flex">
                <span class="m-2 h6">
                  Проверен:
                </span>
                <select class="browser-default custom-select"
                  v-model="filterDataUser.isUserChecked"
                >
                  <option :value="undefined" selected>Неважно</option>
                  <option :value="true">Проверен</option>
                  <option :value="false">Не проверен</option>
                </select>
              </div>
              <div class="filter__drop_item d-flex">
                <mdb-btn m='0'
                  @click='setFilterUser'
                >Применить
                </mdb-btn>
              </div>
            </div>
            <div class="filter__drop-menu"
              v-if="isShowFilter && isShowReports"
            >
              <div class="filter__drop_item d-flex">
                <span class="m-2 h6 w-50 d-flex">
                  Статус:
                </span>
                <select class="browser-default custom-select"
                  v-model="filterDataReport.status"
                >
                  <option :value="undefined" selected>Неважно</option>
                  <option :value="1">Одобрен</option>
                  <option :value="-1">Не одобрен</option>
                  <option :value="0">На расмотрении</option>
                </select>
              </div>
              <div class="filter__drop_item d-flex">
                <span class="m-2 h6 w-50 d-flex">
                  Проверен:
                </span>
                <select class="browser-default custom-select"
                  v-model="filterDataReport.isReportChecked"
                >
                  <option :value="undefined" selected>Неважно</option>
                  <option :value="true">Проверен</option>
                  <option :value="false">Не проверен</option>
                </select>
              </div>
              <mdb-btn m='2' size='sm'
                  @click='setFilterReport'
                >Применить
                </mdb-btn>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col='12' p='0'>
          <mdb-datatable
            :data="tabletData"
            :key="dataTableKey"
            striped
            bordered
          />
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <UserEdit
      v-if="isShowUserEdit"
      :closeForm = closeForm
      :user = userEdit
      :userRows = userRows
      :appDataUserRows = appDataUserRows
      :todo="todo"
    />
    <UserEdit
      v-if="isShowUserAdd"
      :closeForm = closeForm
      :user = dataUserAdd
      :userRows = userRows
      :appDataUserRows = appDataUserRows
      :todo="todo"
    />
    <ReportEdit
      v-if="isShowReportEdit"
      :closeForm="closeForm"
      :reportEdit="reportEdit"
      :reportRows="reportRows"
      :appDataReportRows = appDataReportRows
      :todo="todo"
    />
    <ReportEdit
      v-if="isShowReportAdd"
      :closeForm="closeForm"
      :reportEdit="dataReportAdd"
      :reportRows="reportRows"
      :appDataReportRows = appDataReportRows
      :todo="todo"
    />
  </div>
</template>

<script>
import UserEdit from '@/components/admin/UserEdit';
import ReportEdit from '@/components/admin/ReportEdit';

import { mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbDatatable,} from 'mdbvue';
import { BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare, } from 'bootstrap-vue'

export default {
  name: "Admin",
  layout: 'EmptyLayout',
  middleware: ['authenticated','isadminschek'],
  data:()=>({
    todo: '',
    dataTableKey: 0,
    isShowUsers: false,
    isShowReports: false,
    isShowUserEdit: false,
    isShowUserAdd: false,
    isShowReportEdit: false,
    isShowReportAdd: false,
    isShowFilter: false,
    filterDataUser:{
      isEmailConfirmed: undefined,
      isUserChecked: undefined,
    },
    filterDataReport:{
      status: undefined,
      isReportChecked: undefined,
    },
    isEmailConfirmed: true,
    QuestionSquare:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="question square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-question-square report__status_icon amber-text b-icon bi"><g data-v-2730f04a=""><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path></g></svg>',
    XSquareFill:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="x square fill" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-x-square-fill report__status_icon red-text b-icon bi"><g data-v-2730f04a=""><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path></g></svg>',
    CheckSquare:'<svg data-v-2730f04a="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-check-square report__status_icon green-text b-icon bi"><g data-v-2730f04a=""><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"></path></g></svg>',
    tableDataUser:{
      columns: [{
          label: 'id',
          field: 'id',
          sort: 'asc'
        },{
          label: 'ФИО',
          field: 'name',
          sort: 'asc'
        },{
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },{
          label: 'Статус Почты',
          field: 'isEmailChecked',
          sort: 'asc'
        },{
          label: 'Проверен',
          field: 'isUserChecked',
          sort: 'asc'
        },{
          label: 'Открыть',
          field: 'open',
          sort: 'asc'
      }],
      rows: []
    },
    tableDataReport:{
      columns: [{
          label: 'id',
          field: 'id',
          sort: 'asc'
        },{
          label: 'Название',
          field: 'title',
          sort: 'asc'
        },{
          label: 'Статус',
          field: 'status',
          sort: 'asc'
        },{
          label: 'Email',
          field: 'email',
          sort: 'asc'
        },{
          label: 'Проверен',
          field: 'isReportChecked',
          sort: 'asc'
        },{
          label: 'Открыть',
          field: 'open',
          sort: 'asc'
      }],
      rows: []
    },
    tabletData:{},
    dataReportAdd:{
      annotations: "",
      annotationsEn: "",
      email: "",
      fileName: "",
      isReportChecked: false,
      speakerList: [],
      speakerListEn: [],
      status: 0,
      title: "",
      titleEn: "",
    },
    dataUserAdd:{
      name:"",
      nameEn:"",
      surname:"",
      surnameEn:"",
      patronymic:"",
      patronymicEn:"",
      organization:"",
      organizationEn:"",
      position:"",
      positionEn:"",
      place:"",
      placeEn:"",
      aboutMe:"",
      aboutMeEn:"",
      email:"",
      telephone:"",
      isEmailConfirmed:false,
      isUserChecked:false
    },
  }),
  computed:{
    
    reportList(){return this.$store.getters['admin/getReportsList']},
    userList(){return this.$store.getters['admin/getUsersList']},
    userEdit(){return this.$store.getters['admin/getUsersEdit']},
    reportEdit(){
      const rep = this.$store.getters['admin/getReportEdit']
      let speakerList = rep.speakerList.map(el => {
        return {...el}
      })
      let speakerListEn = rep.speakerListEn.map(el => {
        return {...el}
      })
      return {...rep, speakerList, speakerListEn}
    },

    userRows(){
      return this.$store.getters['admin/getUsersList'].map(el =>{
        return {
          id: el.id,
          name: `${el.surname} ${el.name?el.name[0]+'.':''} ${el.patronymic?el.patronymic[0]+'.':''}`,
          email: el.email,
          isEmailChecked: el.isEmailConfirmed ? this.CheckSquare : this.XSquareFill,
          isUserChecked: el.isUserChecked ? this.CheckSquare : this.XSquareFill,
          open: `<button data-v-bc7807ae="" type="button" onclick="window.$nuxt.$children[1].$children[1].$children[0].startEditUsers(${el.id})" class="btn btn-default btn-sm ripple-parent m-0" data-v-2730f04a="">Откр</button>`,
        }
    })},
    reportRows(){
      return this.$store.getters['admin/getReportsList'].map(el => {
        return {
          id:el.id,
          title: el.title,
          email: el.email,
          status: el.status == 1 ? this.CheckSquare : el.status == 0 ? this.QuestionSquare : this.XSquareFill,
          isReportChecked: el.isReportChecked ? this.CheckSquare : this.XSquareFill,
          open: `<button data-v-bc7807ae="" type="button" onclick="window.$nuxt.$children[1].$children[1].$children[0].startEditReport(${el.id})" class="btn btn-default btn-sm ripple-parent m-0" data-v-2730f04a="">Откр</button>`,
        }
      })
    }
  },
  methods:{
    async appData(){
      await this.$store.dispatch('admin/fetchUsers')
      await this.$store.dispatch('admin/fetchReports')

      this.tableDataReport.rows = this.reportRows
      this.tableDataUser.rows = this.userRows

      this.rerenderDataTable()
      
    },
    createReport(){
      this.todo = 'create'
      this.isShowReportAdd = true
    },
    createUser(){
      this.todo = 'create'
      this.isShowUserAdd = true
    },
    rerenderDataTable(){
      this.dataTableKey += 1
    },
    appDataUserRows(user, id){
      this.userRows.map(el => {
        if(el.id === id){
          el.name = `${user.surname} ${user.name?user.name[0]+'.':''} ${user.patronymic?user.patronymic[0]+'.':''}`
          el.email = user.email
          el.isEmailChecked = user.isEmailConfirmed ? this.CheckSquare : this.XSquareFill
          el.isUserChecked = user.isUserChecked ? this.CheckSquare : this.XSquareFill

        }
      })
    },
    appDataReportRows(report){
      console.log(report);
      this.reportRows.map(el => {
        if(el.id === report.id){
          el.title = report.title
          el.email = report.email
          el.status = report.status == 1 ? this.CheckSquare : report.status == 0 ? this.QuestionSquare : this.XSquareFill
          el.isReportChecked = report.isReportChecked ? this.CheckSquare : this.XSquareFill
        }
      })
      setTimeout(() => {
        this.rerenderDataTable()
      }, 1000);
    },
    closeForm(){ 
      this.isShowUserEdit = false 
      this.isShowUserAdd = false 
      this.isShowReportEdit = false
      this.isShowReportAdd = false
      this.dataReportAdd = {
        annotations: "",
        annotationsEn: "",
        email: "",
        fileName: "",
        isReportChecked: false,
        speakerList: [],
        speakerListEn: [],
        status: 1,
        title: "",
        titleEn: "",
      }
      this.dataUserAdd={
        name:"",
        nameEn:"",
        surname:"",
        surnameEn:"",
        patronymic:"",
        patronymicEn:"",
        organization:"",
        organizationEn:"",
        position:"",
        positionEn:"",
        place:"",
        placeEn:"",
        aboutMe:"",
        aboutMeEn:"",
        email:"",
        telephone:"",
        isEmailConfirmed:false,
        isUserChecked:false
      }
    },
    
    async startEditUsers(id){
      await this.$store.dispatch('admin/fetchUserById', id)
      this.todo = 'edit'
      this.isShowUserEdit = true
    },
    async startEditReport(id){
      try {
        await this.$store.dispatch('admin/fetchReportById', id)
        this.todo = 'edit'
        this.isShowReportEdit = true
      } catch (error) {
        alert('Не удалось загрузть доклад')
      }
    },
    testAxios(){
      console.log(this.$store.getters['admin/getReportsList']);
    },
    changeCollection(col){
      if(col === "R"){
        this.tableDataReport.rows = this.reportRows
        this.tabletData = this.tableDataReport
        this.isShowReports = true
        this.isShowUsers = false
        this.rerenderDataTable()
      }
      if(col === "U"){
        this.tableDataUser.rows = this.userRows
        this.tabletData = this.tableDataUser
        this.isShowReports = false
        this.isShowUsers = true
        this.rerenderDataTable()
      }
    },
    async setFilterUser(){
      let filter = {}
      for(let key in this.filterDataUser){
        if(this.filterDataUser[key] !== undefined){
          filter[key] = this.filterDataUser[key]
        }
      }
      await this.$store.dispatch('admin/fetchUsers',filter)

      this.tableDataUser.rows = this.userRows
      this.tabletData = this.tableDataUser
      this.rerenderDataTable()
      this.isShowFilter = false
    },
    async setFilterReport(){
      let filter = {}
      for(let key in this.filterDataReport){
        if(this.filterDataReport[key] !== undefined){
          filter[key] = this.filterDataReport[key]
        }
      }
      
      await this.$store.dispatch('admin/fetchReports',filter)

      this.tableDataReport.rows = this.reportRows
      this.tabletData = this.tableDataReport
      this.rerenderDataTable()
      this.isShowFilter = false
      
    },
  },
  created(){
    this.$store.commit('setCookie')
    this.$store.dispatch('admin/fetchReports')
    this.$store.dispatch('admin/fetchUsers')
  },
  mounted(){
    
  },
  components:{
    UserEdit, ReportEdit,
    BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare,
    mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbDatatable,

  }
}
// GET /admin/reports - получить ВСЕ доклады
// — К нему можно добавлять параметры типа ?email=email@email.ru. Тогда он будет фильтровать данные. Фильтровать можно по всем полям в базе

// GET /admin/reports/:id  - Получить доклад с указанным ID
// — Всё как и стандартный

// PUT /admin/reports/:id - Редактировать доклад с указанным ID
// — Отличие: можно редактировать поля id и email

// DELETE /admin/reports/:id - Удалить доклад с указанным ID
// — Всё как и стандартный
</script>

<style>
.report__status_icon{
  height: 25px;
  width: 25px;
}
.filter__drop-menu{
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  border: 2px solid #ddd;
  z-index: 101;
}
</style>