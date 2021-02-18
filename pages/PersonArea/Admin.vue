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
          <div class="filter d-flex align-content-center align-items-center">
            <mdb-btn m='0'
              @click="setFilter"
            >Применить
            </mdb-btn>
            <div>фильтры </div>
            <div class="custom-control custom-checkbox custom-control">
              <input type="checkbox" class="custom-control-input" id="isEmailConfirmed"
                v-model="isEmailConfirmed"
              >
              <label class="custom-control-label" for="isEmailConfirmed">1</label>
            </div>
            <!-- Default inline 2-->
            <div class="custom-control custom-checkbox custom-control">
              <input type="checkbox" class="custom-control-input" id="defaultInline2">
              <label class="custom-control-label" for="defaultInline2">2</label>
            </div>
            <!-- Default inline 3-->
            <div class="custom-control custom-checkbox custom-control-inline">
              <input type="checkbox" class="custom-control-input" id="defaultInline3">
              <label class="custom-control-label" for="defaultInline3">3</label>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col='12' p='0'>

          <mdb-tbl responsiveSm bordered
            v-if="isShowReports"
          >
            <mdb-tbl-head textWhite class="rounded teal lighten-1">
              <tr>
                <th colspan="40"><h5 class="mb-0">Доклады</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>id</th>
                <th>Название</th>
                <th>Статус</th>
                <th>email</th>
                <th>Открыть</th>
              </tr>
              <tr
                v-for="(item, ind) in reportList" :key='ind'
              >
                <th>{{item.id}}</th>
                <th>{{item.title}}</th>
                <th class="p-0 align-middle text-center">
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
                <th>{{item.email}}</th>
                <th class='p-0'>
                  <mdb-btn m='0'
                    @click="startEditReport(item.id)"
                  >
                    Открыть
                  </mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <mdb-tbl responsiveSm bordered
            v-if="isShowUsers"
          >
            <mdb-tbl-head textWhite class="rounded teal lighten-1">
              <tr>
                <th colspan="50"><h5 class="mb-0">Пользователи</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>id</th>
                <th>ФИО</th>
                <th>email</th>
                <th>Статус почты</th>
                <th>Проверен</th>
                <th>Открыть</th>
              </tr>
              <tr
                v-for="(item, ind) in userList" :key='ind'
              >
                <th>{{item.id}}</th>
                <th>{{`${item.surname} ${item.name?item.name[0]:''}. ${item.patronymic?item.patronymic[0]+'.':''}`}}</th>
                <th>{{item.email}}</th>
                <th class="p-0 align-middle text-center">
                  <BIconXSquareFill
                    class="report__status_icon red-text"
                    v-if="!item.isEmailConfirmed"
                  />
                  <BIconCheckSquare
                    class="report__status_icon green-text"
                    v-if="item.isEmailConfirmed"
                  />
                </th>
                <th class="p-0 align-middle text-center">
                  <BIconXSquareFill
                    class="report__status_icon red-text"
                    v-if="!item.isUserChecked"
                  />
                  <BIconCheckSquare
                    class="report__status_icon green-text"
                    v-if="item.isUserChecked"
                  />
                </th>
                <th class='p-0'>
                  <mdb-btn m='0'
                    @click="startEditUsers(item.id)"
                  >
                    Открыть
                  </mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
            <mdb-btn
              @click="testAxios"
            >
              Тест
            </mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <UserEdit
      v-if="isShowUserEdit"
      :closeForm = closeFormEditUser
      :user = userEdit
    />
    <ReportEdit
      v-if="isShowReportEdit"
      :closeForm = closeFormEditReport
    />
  </div>
</template>

<script>
import UserEdit from '@/components/admin/UserEdit';
import ReportEdit from '@/components/admin/ReportEdit';

import { mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import { BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare, } from 'bootstrap-vue'

export default {
  name: "Admin",
  layout: 'EmptyLayout',
  middleware: ['authenticated','isadminschek'],
  data:()=>({
    isShowUsers: false,
    isShowReports: false,
    isShowUserEdit: false,
    isShowReportEdit: false,
    filterData:{},

    isEmailConfirmed: true,

  }),
  computed:{
    reportList(){return this.$store.getters['admin/getReportsList']},
    userList(){return this.$store.getters['admin/getUsersList']},
    userEdit(){return this.$store.getters['admin/getUsersEdit']},
  },
  methods:{
    closeFormEditUser(){ this.isShowUserEdit = false },
    closeFormEditReport(){ this.isShowReportEdit = false },
    async startEditUsers(id){
      await this.$store.dispatch('admin/fetchUserById', id)
      this.isShowUserEdit = true
    },
    async startEditReport(id){
      try {
        await this.$store.dispatch('admin/fetchReportById', id)
        //this.$store.commit('admin/setEditReport');
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
        this.isShowReports = true
        this.isShowUsers = false
      }
      if(col === "U"){
        this.isShowReports = false
        this.isShowUsers = true
      }
    },
    setFilter(){
      this.$store.dispatch('admin/fetchUsers',{isEmailConfirmed: this.isEmailConfirmed})
    }
  },
  created(){
    this.$store.commit('setCookie')
    this.$store.dispatch('admin/fetchReports')
    this.$store.dispatch('admin/fetchUsers')
  },
  mounted(){
    //console.log(this.$store);
  },
  components:{
    UserEdit, ReportEdit,
    BIconXSquareFill, BIconCheckSquare, BIconQuestionSquare,
    mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
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
</style>