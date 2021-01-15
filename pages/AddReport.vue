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
                <th>Докладчик</th>
                <th>Изм. пор.</th>
                <th>Ред./Удал.</th>
              </tr>
              <tr
                v-for="(item, ind) of author" :key='ind'
              >
                <th>{{ind+1}}</th>
                <th>{{item.DOB}}</th>
                <th class="p-0">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="ind"
                      v-model="item.isSpeaker"
                    >
                    <label class="custom-control-label" :for="ind"></label>
                  </div>
                </th>
                <th class="p-0">
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="upAuthor(ind)">Up</mdb-btn>
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="downAuthor(ind)">Down</mdb-btn>
                </th>
                <th class="p-0">
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="startEditAuthor(ind)">Ed</mdb-btn>
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="deletAuthor(ind)">Dl</mdb-btn>
                </th>
              </tr>
              <tr>
                <th colspan="5" class="p-0">
                  <mdb-btn class="m-0 px-3 py-2" color='primary' @click="createAuthor(ind)">Добавить автора</mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          23
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container
      v-if="isAuthorCrate"
    >
      <FormEditAuthor
        :editAuthor='editAuthor'
      />
    </mdb-container>
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import FormEditAuthor from '@/components/FormEditAuthor';
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';



export default {
  name: "AddReport",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,

    docladchiki:[
      {
        sulrname:'Нуждин',
        name:'Алесей',
        patronymic:'Иванович',
        position:'Программист',
        organization:'ГПТНБ',
        email:'forsah34@gmail.com',
      },{
        sulrname:'Гаас',
        name:'Андрей',
        patronymic:'Хэзэвович',
        position:'Программист',
        organization:'ГПТНБ',
        email:'gaasы777@gmail.com',
      },{
        sulrname:'Наас',
        name:'Вндрей',
        patronymic:'Тэзэвович',
        position:'Программист',
        organization:'ГПТНБ',
        email:'gaaвs777@gmail.com',
      },{
        sulrname:'Иаас',
        name:'Ондрей',
        patronymic:'Ыэзэвович',
        position:'Программист',
        organization:'ГПТНБ',
        email:'gaaавs777@gmail.com',
      },
    ],
    author:[],
    isAuthorCrate: false,
    editAuthor: {},

  }),
  computed:{
    
  },
  created(){
    this.setAuthor()
  },
  mounted(){
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
    setAuthor(){
      this.author = this.docladchiki.map((el, ind)=>{
        return {
          DOB: `${el.sulrname} ${el.name[0]}. ${el.patronymic[0]}.`,
          num: ind,
          isSpeaker: false,
        }
    })},
    startEditAuthor(ind){
      this.isAuthorCrate = true
      this.editAuthor = this.docladchiki[ind]
    },
    deletAuthor(ind){
      this.author.splice(ind, 1)
    },
    upAuthor(ind){
      if(ind == 0) return
      const el = {...this.author[ind]}
      this.author.splice(ind-1, 0, el)
      this.author.splice(ind+1, 1)
    },
    downAuthor(ind){
      if(ind + 1 == this.author.length) return
      const el = {...this.author[ind]}
      //el.DOB = 'cope'+ind
      this.author.splice(ind+2, 0, el)
      this.author.splice(ind, 1)
    },
    createAuthor(){
      this.isAuthorCrate = true
    },

    log(el){
      console.log(el);
    }
  },
  components:{
    FormEditAuthor,
    mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
  }
};
</script>