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
                <th>Док</th>
                <th class='m-0 p-0'></th>
                <th>Ред./ Удал.</th>
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
                  <mdb-btn-group vertical>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="upAuthor(ind)">
                      <BIconCaretUpFill/>
                    </mdb-btn>
                    <mdb-btn class="m-0 px-2 py-1" color='primary' @click="downAuthor(ind)">
                      <BIconCaretDownFill/>
                    </mdb-btn>
                  </mdb-btn-group>
                </th>
                <th class="p-0">
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="startEditAuthor(ind)">
                    <BIconPencilSquare/>
                  </mdb-btn>
                  <mdb-btn class="m-0 px-1 py-1" color='primary' @click="deletAuthor(ind)">
                    <BIconTrashFill/>
                  </mdb-btn>
                </th>
              </tr>
              <tr>
                <th colspan="5" class="p-0">
                  <mdb-btn class="m-1 px-3 py-2" color='primary' @click="createAuthor()">Добавить автора</mdb-btn>
                </th>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
          <div class="form-group">
            <label for="nameReport" class="h5">Название доклада</label>
            <input type="text" id="nameReport" class="form-control">
          </div>
          <div class="form-group">
            <label for="Annotations" class="h5">Аннотации</label>
            <mdb-input outline type="textarea" :rows='5' id='Annotations' class='mt-0'/>
          </div>
          
        </mdb-col>
        <mdb-col col="12" sm='12' md='6' lg='6' class=''>
          23
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
      />
    </mdb-container>
  </div>
</template>

<script>
import { RU, EN } from '@/constants/language';
import {localeRout} from '@/assets/utils'

import FormEditAuthor from '@/components/FormEditAuthor';
import { BIcon, BIconCaretDownFill, BIconCaretUpFill, BIconTrashFill, BIconPencilSquare  } from 'bootstrap-vue'
import { mdbContainer, mdbInput,  mdbBtn, mdbBtnGroup, mdbRow, mdbCol, mdbTbl, mdbTblHead, mdbTblBody, mdbIcon  } from 'mdbvue';



export default {
  name: "AddReport",
  layout: 'EmptyLayout',
  data: () => ({
    RU, EN,
    author:[],
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

  }),
  computed:{
    speakers(){
      return this.$store.getters.getSpeakers
    },
  },
  watch:{
    speakers(){
      this.setAuthor()
    }
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
    closeEdit(){
      this.isAuthorEdit = false
    },
    closeCreate(){
      this.isAuthorCrate = false
    },
    setAuthor(){
      
      this.author = this.speakers.map((el, ind)=>{
        return {
          DOB: `${el.surname} ${el.name[0]}. ${el.patronymic[0] ? el.patronymic[0]+'.': ''}`,
          isSpeaker: el.isSpeaker,
        }
    })},
    startEditAuthor(ind){
      const speakers = this.$store.getters.getSpeakers
      this.editAuthor = speakers[ind]
      this.isAuthorEdit = true
      
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
    createAuthor(){
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
</style>