<template>
  <mdb-card class='m-sm-2 m-lg-3'>
    <mdb-view hover>
      <a href="#!">
        <mdb-card-image
          :src="'/assets/img/'+img"
          alt="Card image cap"/>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body>
      <mdb-card-title class='text-info text-uppercase bib__card-title'>{{title}}</mdb-card-title>
      <mdb-card-text class="bib__card_text">
        {{text}}
        <span
          v-if="isShowMore"
        >
          {{text2}}
        </span>
        <a class='d-flex' @click="isShowMore =! isShowMore" v-if="text2">
          <span v-if="!isShowMore">{{$t('main_card_organizetion_text_show')}}</span> 
          <span v-if="isShowMore">{{$t('main_card_organizetion_text_hide')}}</span> 
        </a>
      </mdb-card-text>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbView, mdbMask
} from 'mdbvue';

export default {
  props:['title','text','text2','img'],
  data:()=>({
    isShowMore: false,
  }),
  components:{
    mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbView, mdbMask
  }
}
</script>

<style>

</style>