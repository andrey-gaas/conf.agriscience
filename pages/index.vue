<template>
  <main class="main">
    <container class="main__img d-flex justify-content-center align-items-center flex-column">
      <h1 class="main__title_sm">{{$t('main_header_subtitle')}}</h1>
      <h2 class="main__title_lg">{{$t('main_header_title')}}</h2>
    </container>
    <container  class="p-0">
      <menu class="menu__list_sm p-0 m-0">
        <container class="m-0 toggle-drop-menu">
          <div class="toggle">
            <div class="ham__btn"
              @click="isMenuDrop = !isMenuDrop"
            >
              <div class="ham_line"></div>
              <div class="ham_line"></div>
              <div class="ham_line"></div>
            </div>
          </div>
        </container>
        <container class="m-0 py-2 overflow-hidden container_menu"
          :class="{ active: isMenuDrop }"
        >
          <li
            v-for="(item, ind ) in menuDataSm" :key="ind"
            class='menu__item_sm'
          >
          {{item.title}}
          </li>
        </container>
      </menu>
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
        <div class="conteiner__left p-4">
          <div class="card-user">
            <div class="card-user_head">
              <div class="card-user_photo shadow">
                <img src="assets/img/reg_img.jpg" alt="user photo" class="card-user__img_user">
              </div>
            </div>
            <div class="ucard-user_main text-center">
              <h6 class="card-user__user-position font-weight-light">Веб программист</h6>
              <h5 class="card-user__user-name font-weight-bold">Alex Nuzhdin</h5>
              <p class="card-user__user-desc">Мне 23 года, я деалю крутые сайты. Надо ещё текста добить, а то как-то маловато выходит. Нужно чтобы было хотя бы несколкьо строк.</p>
            </div>
          </div>
        </div>
        <div class="conteiner__middle">
          <div class="reg__block mb-3 d-flex justify-content-around align-items-center flex-column">
            <span class="reg__text-info">Регестрация будет открыта с 15 января</span>
            <nuxt-link class="btn__move-reg unactiv" :to="localeRout('/')">Зарегистрироваться</nuxt-link>
          </div>
          <div class="announcement">
            <h4 class="announcement__title">Уважаемые коллеги, мы принимаем заявки: </h4>
            <div class="ad__left d-flex justify-content-around align-items-center">
              для участия с докладом<br>до 15 марта 2020 года
            </div>
            <div class="ad__right d-flex justify-content-around align-items-center">
              для участия без доклада<br>до 26 апреля 2020 года
            </div>
          </div>
          <div class="congress-topics">
            <h3 class="congress-topic__title px-4">Темы Конгресса</h3>
            <ul class="congress-topic__list px-4">
              <li class="congress-topic__item">
                Трансформация библиографии в цифровую эпоху. Роль библиографической информации в меняющейся системе научных коммуникаций. Стратегия развития библиографической деятельности на международном уровне. Проблемы взаимоиспользования ресурсов.
              </li>
              <li class="congress-topic__item">
                Координация и кооперация библиографической деятельности на международном и национальном уровнях.
              </li>
              <li class="congress-topic__item">
                Создание, распространение и продвижение библиографической информации. Формы и форматы представления библиографических данных в Сети и электронных информационных системах.
              </li>
              <li class="congress-topic__item">
                Разработка и внедрение новых международных и отечественных норм библиографического описания.
              </li>
              <li class="congress-topic__item">
                Библиографирование электронных ресурсов локального и удаленного доступа. Современные ресурсы национальной библиографии. Совершенствование законодательства об обязательном экземпляре (электронный обязательный экземпляр).
              </li>
              <li class="congress-topic__item">
                Корпоративная каталогизация как форма библиографического взаимодействия библиотек.
              </li>
              <li class="congress-topic__item">
                Библиометрическая информация в открытой науке.
              </li>
              <li class="congress-topic__item">
                Лингвистические аспекты представления метаданных в Сети: «предметные входы», семантический веб.
              </li>
              <li class="congress-topic__item">
                Нормативное обеспечение библиографирования на современном этапе.
              </li>
              <li class="congress-topic__item">
                Модели функциональных требований к библиографическим и авторитетным данным.
              </li>
              <li class="congress-topic__item">
                Библиографическая информация для пользователей: продукты и сервисы.
              </li>
              <li class="congress-topic__item">
                Качество библиографической информации: критерии оценки.
              </li>
              <li class="congress-topic__item">
                Компетенции библиографов: подготовка, переподготовка, повышение квалификации.
              </li>
              <li class="congress-topic__item">
                Краеведческая библиографическая информация в цифровую эпоху.
              </li>
              <li class="congress-topic__item">
                История библиографии в Сибири.
              </li>
            </ul>
          </div>

        </div>
        <div class="conteiner__right">
          <div class="card card-biblio m-4 rounded"
            v-for="(item, ind ) in bibCardData" :key="ind"
          >
            <img class="card-img-top" src="/assets/img/reg_img.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title text-info text-uppercase">{{item.title}}</h5>
              <p class="card-text">{{item.text}}</p>
            </div>
          </div>
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
      { title: 'main_menu_participants', bgColor: '58B0B1' },
      { title: '', bgColor: 'A1D3D2' },
      { title: 'main_menu_events', bgColor: '89C6C4' },
      { title: '', bgColor: '6BBBB8' },
      { title: 'main_menu_materials', bgColor: '74C0C0' },
      { title: '', bgColor: '63B8B5' },
      { title: 'main_menu_participants', bgColor: '4FADAD' },
      { title: '', bgColor: '80C4C3' },
      { title: 'main_menu_participants', bgColor: '6DBBBB' },
    ],
    menuDataSm:[
      { title: 'main_menu_participants' },
      
      { title: 'main_menu_events' },

      { title: 'main_menu_materials'},
      
      { title: 'main_menu_participants' },
      
      { title: 'main_menu_participants'},
    ],
    bibCardData:[
      { title:'Государственная публичная научно-техническая библиотека Сибирского отделения Российской академии наук',
        text:'Крупнейшая библиотека России за Уралом, государственный универсальный депозитарий Сибири.'},
      { title:'Российская национальная библиотека',
        text:'Старейшая публичная и первая национальная библиотека России, одна из крупнейших в мире и вторая по величине фондов в Российской Федерации'},
      { title:'Российская государственная библиотека',
        text:'Крупнейшая публичная библиотека в России и континентальной Европе и одна из крупнейших библиотек мира.'},
      { title:'Государственная публичная научно-техническая библиотека России',
        text:'Крупнейшая научно-техническая библиотека страны, научно-исследовательский институт и информационный центр федерального значения.'},
    ],
    isMenuDrop:false,
  }),
  methods:{
    localeRout,
  },
  components: {
    'container': mdbContainer,
  },
  created(){
    this.menuData.map(el =>{
      el.title = this.$t(el.title)
    })
    this.menuDataSm.map(el =>{
      el.title = this.$t(el.title)
    })
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
