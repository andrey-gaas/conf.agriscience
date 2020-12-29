<template>
  <main class="main">
    <container class="main__img d-flex justify-content-center align-items-center flex-column">
      <h1 class="main__title_sm">III Международный библиографический конгресс</h1>
      <h2 class="main__title_lg">Библиографическая информация в цифровой культуре</h2>
    </container>
    <container  class="p-0">
      <section class="section section_top d-flex">
        <menu class="menu__list d-flex p-0 m-0">
          <li
            v-for="(item, ind ) in menuData" :key="ind"
            class='menu__item'
            :style="{ backgroundColor:'#'+item.bgColor }"
          >
          {{item.title}}
          </li>
        </menu>
        <div class="descrption p-4 ">
          <p>Приглашаем вас принять участие в III Международном библиографическом конгрессе, который состоится 27 – 29 апреля 2021 года. Впервые Конгресс пройдет в онлайн-формате. Участие бесплатное.</p>
          <p>Конгресс состоится на базе Государственной публичной научно-технической библиотеки Сибирского отделения Российской академии наук (ГПНТБ СО РАН), Новосибирск. Это будет уже третий международный библиографический конгресс: первый прошел в 2010 году в 
            Российской государственной библиотеке, а второй — 
            в 2015 году в Российской национальной библиотеке. (даём ссылки на сайты) <br>
            Рабочие языки конгресса: русский и английский.
          </p>
        </div>
        <div class="organizetion flex-grow-1 p-4">
          <h3>Координаторы программного комитета</h3>
          <p>
            Лаврик Ольга Львовна<br>
            доктор педагогических наук, профессор, главный научный сотрудник, заведующий лабораторией информационно-системного анализа, <br>
            ГПНТБ СО РАН, Новосибирск, Россия<br>
            тел. +7 383 373 06 31, lavrik@spsl.nsc.ru
          </p>
          <p>
            Леликова Наталья Константиновна<br>
            доктор исторических наук, Российская национальная библиотека, С-Петербург, председатель секции библиографии и информационно-библиографического обслуживания Российской библиотечной ассоциации<br>
            e-mail: nklelikova@ya.ru
          </p>
        </div>
      </section>
      <section class="section d-flex">
        <div class="conteiner__left">
1
        </div>
        <div class="conteiner__middle">
          <div class="reg__block d-flex justify-content-around align-items-center flex-column">
            <span>Регестрация будет открыта с 15 января</span>
            <nuxt-link class="btn__move-reg unactiv" :to="localeRout('/')">Зарегистрироваться</nuxt-link>
          </div>
          <div class="announcement">
            <h4 class="announcement__title">Уважаемые коллеги, мы принимаем заявки: </h4>
            <div class="ad__left">
              для участия с докладом<br>до 15 марта 2020 года
            </div>
            <div class="ad__right">
              для участия без доклада<br>до 26 апреля 2020 года
            </div>
          </div>
        </div>
        <div class="conteiner__right">
3
        </div>
      </section>
    </container>
  </main>
</template>

<script>
import {
  mdbContainer,
} from 'mdbvue';
import {localeRout} from '@/assets/utils'

export default {
  data:()=>({
    menuData:[
      {title:'участники', bgColor:'58B0B1'},
      {title:'', bgColor:'A1D3D2'},
      {title:'события', bgColor:'89C6C4'},
      {title:'', bgColor:'6BBBB8'},
      {title:'материалы', bgColor:'74C0C0'},
      {title:'', bgColor:'63B8B5'},
      {title:'участники', bgColor:'4FADAD'},
      {title:'', bgColor:'80C4C3'},
      {title:'участники', bgColor:'6DBBBB'},
    ]
  }),
  methods:{
    localeRout,
  },
  components: {
    'container': mdbContainer,
  },
};

</script>

<style>
.main{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
