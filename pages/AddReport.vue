<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1">
    <mdb-container class="rounded-lg grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0" >
      <mdb-row class="m-0 bg-primary" p='3'>
        <h2 class="mb-0  white-text"><strong>Доклады</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col="12" sm='12' md='6' lg='6' class='mb-sm-4 mb-4 mb-lg-0 mb-md-0'
          :class="{'order-3':($i18n.locale == EN)}"
        >
          <mdb-tbl responsiveSm>
            <mdb-tbl-head color="blue" textWhite class="rounded">
              <tr>
                <th colspan="5"><h5 class="mb-0">Авторы</h5></th>
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr>
                <th>№</th>
                <th>ФИО</th>
                <th>Доклдчик</th>
                <th>Ред.</th>
                <th>Удал.</th>
              </tr>
              <tr>
                
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          23
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>

import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

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
        email:'gaas777@gmail.com',
      },
    ]

  }),
  computed:{
    
  },
  created(){
    
  },
  mounted(){
    
  },
  validations:{
    
  },
  methods:{
    localeRout,
  },
  components:{
    mdbContainer, mdbInput, mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
  }
};
</script>