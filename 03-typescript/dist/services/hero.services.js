"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeroById = void 0;
const hero_1 = require("../data/hero");
const findHeroById = (id) => {
    return hero_1.heroes.find(hero => hero.id === id);
};
exports.findHeroById = findHeroById;
