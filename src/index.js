"use strict";

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Card from './card/card';

const films = [
   {
      id: 0,
      title: "",
      description: "",
      poster: "",
      team: {},
   },
   {
      id: 1,
      title: "Віддана",
      description: "Історія починається в Станіславові у другій половині 19 століття. Доктор Анґер втрачає в пожежі дружину, але вдається врятувати двох дівчат – рідну доньку Аделю і доньку хатніх робітників Стефанію. Минає 25 років... <br> У калейдоскопі любові та ревнощів, подвійних смислів та таємниць грань між реальністю і вигадкою остаточно зникає. Що ж станеться, коли ілюзія почне розвіюватися, а замість неї вималюється реальність?",
      poster: 
         "https://film.ua/uploads/film/project/2020/01/22/1efd89a5cddf2b76c69aeb0f27776c695309ba92.jpg",
      team: {},
   },
   {
      id: 2,
      title: "Мавка",
      description: "Мавка — Душа Лісу  — закохуюється у людину, талановитого музику Лукаша, й опиняється перед складним вибором: кохання чи обов'язок лісової берегині. <br> Наша історія — про магічну силу кохання, яке об’єднує, рятує та дарує життя.Тільки воно здатне відкрити в людині дивовижні здібності й якості, за допомогою яких можна подолати зло й людські вади.",
      poster: "https://film.ua/uploads/film/project/2018/06/12/daf3a46f9da20a430c7ac6721e141409f2b01085.jpg",
      team: {},
   },
];

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const cards = [
   new Card(films[1]),
   new Card(films[2]),
];

cards.forEach(card => wrapper.appendChild(card.render()));
