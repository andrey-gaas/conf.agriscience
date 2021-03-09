<template>
  <mdb-col md="6" sm='12' class='p-4 col_m'>
    <h3>{{$t('important_dates')}}</h3>
    <ul class="pl-3">
      <li><strong>{{$t('important_dates_data_1')}}</strong> - {{$t('important_dates_data_1_text')}}</li>
      <li><strong>{{$t('important_dates_data_2')}}</strong> - {{$t('important_dates_data_2_text')}}</li>
      <li><strong>{{$t('important_dates_data_3')}}</strong> - {{$t('important_dates_data_3_text')}}</li>
    </ul>
  </mdb-col>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbBtn
} from 'mdbvue';


export default {
  components: {
    mdbCol,
  },
};

</script>

<style lang="scss" scope>

</style>
