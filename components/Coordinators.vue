<template>
  <div class="organizetion flex-grow-1 p-3">
    <!-- <h3 class="title">{{$t('contact_us')}}</h3>
    <p class="font-ubuntu">
      {{$t('reg_telephone')}} - <span class='font-weight-bold'>+7(383)373-16-42.</span>
    </p>
    <p class="font-ubuntu">
      E-mail - <span class='font-weight-bold'>info@bibcongress.ru</span>
    </p>
    <p class="font-ubuntu">
      <span class='font-weight-bold sekretar'>{{$t('contact_us_secretary')}}</span>
      <span>
        {{$t('contact_us_text')}}
      </span>
    </p> -->

    <div>
      <h3 class="title_coordinators">{{$t('main_сoordinators_text_1')}}</h3>
      <p class="font-ubuntu">
        <span class='font-weight-bold'>{{$t('main_сoordinators_text_2')}}</span><br>
        {{$t('main_сoordinators_text_3')}}<br>
        {{$t('main_сoordinators_text_4')}}<br>
        {{$t('main_сoordinators_text_5')}}
      </p>
      <p class="font-ubuntu">
        <span class='font-weight-bold'>{{$t('main_сoordinators_text_6')}}</span><br>
        {{$t('main_сoordinators_text_7')}}<br>
        e-mail: nklelikova@ya.ru
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.sekretar{
  line-height: 25px;
}
.title_coordinators{
  font-family: Arsenal;
  font-size: 1rem;
  font-weight: bold;
}
</style>