"use strict";

import Card from './card';

const card = new Card({ title: "Robocop" });

const container = document.querySelector("body");
card.render(container);