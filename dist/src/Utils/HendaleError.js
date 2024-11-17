"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hendaleBadRequst = exports.hendaleError = void 0;
const hendaleError = (res, status, message) => {
    console.log(message);
    return res.status(status).send(message);
};
exports.hendaleError = hendaleError;
const hendaleBadRequst = (validator, error) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMessage = `${validator} Error : ${error.message}`;
    error.message = errorMessage;
    error.status = error.status | 400;
    return Promise.reject(error);
});
exports.hendaleBadRequst = hendaleBadRequst;
