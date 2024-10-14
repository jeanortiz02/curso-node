"use strict";
// const getAgePlugin = require('get-age');
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAge = void 0;
const getAge = (birthdate) => {
    // console.log({ currentYear: new Date().getFullYear() });
    // return getAgePlugin(birthdate);
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
};
exports.getAge = getAge;
