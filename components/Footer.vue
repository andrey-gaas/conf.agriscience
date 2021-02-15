<template>
  <mdb-footer class="font-small pt-4 mt-4 bg-dark">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col sm="12">
          <h4 class="title">{{$t('footer_title')}}</h4>
        </mdb-col>
        <mdb-col sm="12" md="6" class="mt-3">
          <h5>{{$t('main_сoordinators_text_2')}}</h5>
          <p>
            {{$t('footer_text_1')}}
          </p>
          <div class="mt-2">
            {{$t('footer_phone')}}:
            <strong class="ml-1">
              <a href="tel:+73833730631" class="text-light">+7(383)-373-06-31</a>
            </strong>
          </div>
          <div class="mt-2">
            E-Mail:
            <strong class="ml-1">
              <a href="mailto:lavrik@spsl.nsc.ru" class="text-light">lavrik@spsl.nsc.ru</a>
            </strong>
          </div>
        </mdb-col>
        <mdb-col sm="12" md="6">
          <h5>{{$t('main_сoordinators_text_6')}}</h5>
          <p>
            {{$t('footer_text_2')}}
          </p>
          <div class="mt-2">
            E-Mail:
            <strong class="ml-1">
              <a href="mailto:nklelikova@ya.ru" class="text-light">nklelikova@ya.ru</a>
            </strong>
          </div>
        </mdb-col>
        <mdb-col col='12' m='t3'>
          <h4 class="title">{{$t('contact_us')}}</h4>
        </mdb-col>
        <mdb-col col='12'>
          <p>
            {{$t('reg_telephone')}}: 
            <strong class="ml-1">
              <a href="tel:+73833731642" class="text-light">+7(383)373-16-42</a>
            </strong> 
          </p>
          <p>
            E-mail: 
            <strong class="ml-1">
              <a href="mailto:info@bibcongress.ru" class="text-light">info@bibcongress.ru</a>
            </strong>
          </p>
          <h5>{{$t('contact_us_secretary')}}</h5>
          <p>
            <span>
              {{$t('contact_us_text')}}
            </span>
          </p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3 mt-4">
      <mdb-container fluid>
        {{$t('footer_spslt')}} &copy; 2021
      </mdb-container>
    </div>
  </mdb-footer>
</template>

<script>
import {
  mdbFooter,
  mdbContainer,
  mdbRow,
  mdbCol,
} from 'mdbvue';

export default {
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
}
</script>
<style>

</style>