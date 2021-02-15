<template>
  <div class="d-flex align-items-center blue lighten-5 min-h-100 flex-grow-1 justify-content-center">
    <mdb-container class="grey lighten-5 z-depth-1 my-0 my-sm-1 my-md-1 my-lg-1" p="0">
      <mdb-row class="m-0 teal lighten-1" p='3'>
        <h2 class="mb-0  white-text"><strong>Админка</strong></h2>
      </mdb-row>
      <mdb-row class="m-0" p='2'>
        <mdb-col col='12' class='justify-content-between d-flex p-0'>
          <mdb-btn-group m='0'>
            <mdb-btn m='0'>Доклады</mdb-btn>
            <mdb-btn m='0'>Люди</mdb-btn>
          </mdb-btn-group>
          <div class="filter d-flex align-content-center align-items-center">
            <div>фильтры </div>
            <div class="custom-control custom-checkbox custom-control">
              <input type="checkbox" class="custom-control-input" id="defaultInline1">
              <label class="custom-control-label" for="defaultInline1">1</label>
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
          <mdb-tbl responsiveSm bordered>
              <mdb-tbl-head textWhite class="rounded teal lighten-1">
                <tr>
                  <th colspan="4"><h5 class="mb-0">Доклады</h5></th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr>
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
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

export default {
  name: "Admin",
  layout: 'EmptyLayout',
  middleware: 'authenticated',
  data:()=>({

  }),
  methods:{
    testAxios(){
      console.log('in test axios');
      this.$store.dispatch('fetchAllReports')
    }
  },
  mounted(){
    //console.log(this.$store);
  },
  components:{
    mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody
  }
}
</script>

<style>

</style>