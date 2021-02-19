<template>
  <div class="wrap__edit-author d-flex align-items-center min-h-100 flex-grow-1">
    <mdb-container class="grey user-edit__conteiner lighten-5 d-flex justify-content-center flex-column rounded-lg overflow-hidden" p="0" m='t5'>
      <div class="overflow-y-auto overflow-x-hidden">
        <mdb-row p='3'>
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='y2'
              label="name" 
              v-model="editUser.name" 
            />
            <mdb-input size="sm" m='y2'
              label="surname" 
              v-model="editUser.surname" 
            />
            <mdb-input size="sm" m='y2'
              label="patronymic" 
              v-model="editUser.patronymic" 
            />
            <mdb-input size="sm" m='y2'
              label="organization" 
              v-model="editUser.organization" 
            />
            <mdb-input size="sm" m='y2'
              label="position" 
              v-model="editUser.position" 
            />
            <mdb-input size="sm" m='y2'
              label="place" 
              v-model="editUser.place" 
            />
            <mdb-input type="textarea" label="About me" :rows="5"
              v-model="editUser.aboutMe"
            />
          </mdb-col>
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='y2'
              label="nameEn" 
              v-model="editUser.nameEn" 
            />
            <mdb-input size="sm" m='y2'
              label="surnameEn" 
              v-model="editUser.surnameEn" 
            />
            <mdb-input size="sm" m='y2'
              label="patronymicEn" 
              v-model="editUser.patronymicEn" 
            />
            <mdb-input size="sm" m='y2'
              label="organizationEn" 
              v-model="editUser.organizationEn" 
            />
            <mdb-input size="sm" m='y2'
              label="positionEn" 
              v-model="editUser.positionEn" 
            />
            <mdb-input size="sm" m='y2'
              label="placeEn" 
              v-model="editUser.placeEn" 
            />
            <mdb-input type="textarea" label="About me En" :rows="5"
              v-model="editUser.aboutMeEn"
            />
          </mdb-col>
          <!--  -->
          <mdb-col sm='12' lg='6'>
            <mdb-input size="sm" m='y2'
              label="email" 
              v-model="editUser.email" 
            />
            <mdb-input size="sm" m='y2'
              label="telephone" 
              v-model="editUser.telephone" 
            />
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="EmailConfirmed"
                v-model="editUser.isEmailConfirmed"
              >
              <label class="custom-control-label" for="EmailConfirmed">Почта подтверждена</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="isUserConfirm"
                v-model="editUser.isUserChecked"
              >
              <label class="custom-control-label" for="isUserConfirm">Пользователь проверен</label>
            </div>
          </mdb-col>
          <!--  -->
          
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-btn @click="saveUser">
              Cохранить
            </mdb-btn>
            <mdb-btn @click="userIsChecked">
              Проверен
            </mdb-btn>
            <mdb-btn @click="closeForm">
              Отмена
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-container>
  </div>
</template>

<script>


import { RU, EN } from '@/constants/language';
import { transliterate} from '@/assets/utils'

import { helpers, required, email, } from 'vuelidate/lib/validators'
import { mdbContainer, mdbInput,  mdbBtn , mdbBtnGroup, mdbRow, mdbCol } from 'mdbvue';

export default {
  props:['closeForm','user','todo'],
  data: () => ({
    RU, EN,
    editUser:{isUserChecked : false},
  }),
  computed:{
    
  },
  validations:{
    
  },
  methods:{
    transliterate,
    async saveUser(){
      if(this.todo === 'edit'){
        await this.$store.dispatch('admin/saveUserEditBD', this.editUser)
        this.$store.commit('admin/saveUserEdit', {...this.editUser, id:this.user.id})
        this.closeForm()
      }
    },
    async userIsChecked(){
      this.editUser.isUserChecked = true
      await this.$store.dispatch('admin/userIsChecked')
      this.$store.commit('admin/saveUserEdit', {...this.editUser, id:this.user.id})
      this.closeForm()
    },
    
  },
  mounted(){
    
  },
  created(){
    const {
      email,isEmailConfirmed, isUserConfirm, name, nameEn,organization,
      organizationEn, patronymic, patronymicEn, place,placeEn,
      position,positionEn,surname, surnameEn, telephone, isUserChecked,
    } = this.user
    this.editUser = {
      isUserChecked : isUserChecked ? isUserChecked: false,
      email, isEmailConfirmed, isUserConfirm,name, nameEn,organization,
      organizationEn,patronymic,patronymicEn,place,placeEn,position,
      positionEn,surname,surnameEn,telephone,
    }
  },
  components:{
    mdbContainer, mdbInput, mdbBtn , mdbBtnGroup, mdbRow, mdbCol
  }
};
</script>

<style lang="scss">
.wrap__edit-author{
  position: fixed;
  top: 0;
  left:0;
  right: 0;
  min-height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
}
.user-edit__conteiner{
  max-height: 90vh;
  overflow-y: auto !important;
}
.h1000{
  height: 1000px;
  width: 100%;
  background-color: red;
}
</style>