"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hero_services_1 = require("./services/hero.services");
const hero = (0, hero_services_1.findHeroById)(2);
console.log(hero?.name);
