"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUUID = void 0;
const crypto_1 = __importDefault(require("crypto"));
// getUUID is a function that returns a UUID
const getUUID = () => {
    return crypto_1.default.randomUUID();
};
exports.getUUID = getUUID;
