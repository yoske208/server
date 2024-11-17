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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.logout = exports.login = void 0;
const Bcrypt_1 = require("../../Helpers/Bcrypt");
const JWT_1 = require("../../Helpers/JWT");
const UserModel_1 = __importDefault(require("../Modules/UserModel"));
const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
};
const login = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield UserModel_1.default.findOne({ email: user.email });
        if (!foundUser)
            return console.log("User not found");
        const isPasswordCorrect = (0, Bcrypt_1.comparePassword)(user.password, foundUser.password);
        console.log(isPasswordCorrect);
        if (!isPasswordCorrect)
            return console.log("Incorrect password or Email");
        const { _id, isAdmin } = foundUser;
        const token = (0, JWT_1.generateAuthToken)({ _id, isAdmin });
        res.cookie("auth_token", token, cookieConfig);
        return { foundUser, token };
    }
    catch (error) {
        throw new Error("Failed to login");
    }
});
exports.login = login;
const logout = (res) => {
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.logout = logout;
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nueUser = new UserModel_1.default(userData);
        if (!userData) {
            throw new Error("can not add this new user");
        }
        nueUser.password = (0, Bcrypt_1.generateUserPassword)(nueUser.password);
        yield nueUser.save();
        return nueUser;
    }
    catch (error) {
        throw new Error("error to add");
    }
});
exports.register = register;
