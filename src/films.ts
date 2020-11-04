"use strict";

import { v4 as uuid } from 'uuid';

interface TeamType { 
   editor: string;
   actors: string[];
}

class Film {
   private _id: string = "";
   title: string = "";
   description: string = "";
   poster: string = "";
   private team: TeamType = { editor: "", actors: [] };

   constructor(title: string, description: string, poster: string) {
      this._id = uuid();
      [this.title, this.description, this.poster] = [title, description, poster];
   }

   get id(): string { 
      return this._id;
   }

   get editor(): string { 
      return this.team.editor;
   }

   set editor(name: string) { 
      this.team.editor = name;
   }

   addActor(name: string): void { 
      this.team.actors.push(name);
   }
}

export const films: Film[] = [
   new Film("","",""),
   {
      id: uuid(),
      title: "Спіймати Кайдаша",
      description: "Перенесений у сучасні реалії сюжет повісті Івана Нечуя-Левицького близький будь-якому глядачеві. Хтось бачить у героях розширеної версії Спіймати Кайдаша cвою сім'ю, хтось – знайомих і сусідів. <br> Цей серіал нікого не залишає байдужими. Ви будете плакати та сміятися разом із героями історії, впізнавати в них справжніх людей. Напевно, саме тому історію сім'ї Кайдашів продовжують переосмислювати на різний лад протягом стількох років – вона якнайкраще показує життя звичайних людей з їхніми маленькими радощами та драмами.",
      poster: "https://m.media-amazon.com/images/M/MV5BOWNlNmY3NzgtMTQyYy00YTljLWEyZTItY2ZmNDBmZTE3ZmUyXkEyXkFqcGdeQXVyNjQzMTU4ODI@._V1_UY268_CR6,0,182,268_AL_.jpg",
      team: {
         editor: "", actors: [""]
      },
   },
   {
      id: uuid(),
      title: "Віддана",
      description: "Історія починається в Станіславові у другій половині 19 століття. Доктор Анґер втрачає в пожежі дружину, але вдається врятувати двох дівчат – рідну доньку Аделю і доньку хатніх робітників Стефанію. Минає 25 років... <br> У калейдоскопі любові та ревнощів, подвійних смислів та таємниць грань між реальністю і вигадкою остаточно зникає. Що ж станеться, коли ілюзія почне розвіюватися, а замість неї вималюється реальність?",
      poster:
         "https://film.ua/uploads/film/project/2020/01/22/1efd89a5cddf2b76c69aeb0f27776c695309ba92.jpg",
      team: {
         editor: "", actors: [""],
      },
   },
   {
      id: uuid(),
      title: "Мавка",
      description: "Мавка — Душа Лісу  — закохуюється у людину, талановитого музику Лукаша, й опиняється перед складним вибором: кохання чи обов'язок лісової берегині. <br> Наша історія — про магічну силу кохання, яке об’єднує, рятує та дарує життя.Тільки воно здатне відкрити в людині дивовижні здібності й якості, за допомогою яких можна подолати зло й людські вади.",
      poster: "https://film.ua/uploads/film/project/2018/06/12/daf3a46f9da20a430c7ac6721e141409f2b01085.jpg",
      team: {
         editor: "", actors: [""],
      },
   },
];
