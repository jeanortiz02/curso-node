"use strict";
const heroes = [
    {
        id: 1,
        name: 'Iroman',
        owner: 'Marvel'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Batman',
        owner: 'Marvel'
    },
];
const findHeroById = (id) => {
    return heroes.find(hero => hero.id === id);
};
const hero = findHeroById(2);
console.log(hero === null || hero === void 0 ? void 0 : hero.name);
