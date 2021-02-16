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
            <mdb-btn
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
                <th colspan="4"><h5 class="mb-0">Доклады</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>Название</th>
                <th>Статуст</th>
                <th>email</th>
              </tr>
              <tr
                v-for="(item, ind) in reportList" :key='ind'
              >
                <th>{{item.title}}</th>
                <th>{{item.status}}</th>
                <th>{{item.email}}</th>
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
                <th>Телефон</th>
              </tr>
              <tr
                v-for="(item, ind) in userList" :key='ind'
              >
                <th>{{item.id}}</th>
                <th>{{`${item.surname} ${item.name?item.name[0]:''}. ${item.patronymic?item.patronymic[0]+'.':''}`}}</th>
                <th>{{item.email}}</th>
                <th>{{item.isEmailConfirmed}}</th>
                <th>{{item.telephone ? item.telephone: ''}}</th>
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
  </div>
</template>

<script>
import { mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

export default {
  name: "Admin",
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data:()=>({
    isShowUsers: false,
    isShowReports: false,
    filterData:{},

    isEmailConfirmed: true,

  }),
  computed:{
    reportList(){return this.$store.getters['admin/getReportsList']},
    userList(){return this.$store.getters['admin/getUsersList']},
  },
  methods:{
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

</style>