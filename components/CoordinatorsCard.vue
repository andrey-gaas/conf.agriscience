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
      <mdb-card-text class="bib__card_text">{{text}}</mdb-card-text>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbView
} from 'mdbvue';

export default {
  props:['title','text','img'],
  components:{
    mdbCard, mdbCardImage, mdbCardBody, mdbCardTitle, mdbCardText, mdbView
  }
}
</script>

<style>

</style>