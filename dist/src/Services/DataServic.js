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
exports.adduser = exports.updateUser = exports.deleteAll = exports.deleteUser = exports.findUser = exports.alluser = void 0;
const Bcrypt_1 = require("../../Helpers/Bcrypt");
const UserModel_1 = __importDefault(require("../Modules/UserModel"));
const alluser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alluser = UserModel_1.default.find();
        return alluser;
    }
    catch (error) {
        throw new Error("error to find users");
    }
});
exports.alluser = alluser;
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            return console.log("nut find this user");
        }
        return user;
    }
    catch (error) {
        throw new Error("error to find this user");
    }
});
exports.findUser = findUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOneAndDelete(userId.id);
        if (!user) {
            throw new Error("user not find");
        }
        return user;
    }
    catch (error) {
        throw new Error("error to delete this user");
    }
});
exports.deleteUser = deleteUser;
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.deleteMany();
    }
    catch (error) {
        throw new Error("error to find users");
    }
});
exports.deleteAll = deleteAll;
const updateUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nueUser = yield UserModel_1.default.findOneAndUpdate(userData.id, userData, { new: true });
        return yield (nueUser === null || nueUser === void 0 ? void 0 : nueUser.save());
    }
    catch (error) {
        throw new Error("error to edit user");
    }
});
exports.updateUser = updateUser;
const adduser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nueUser = new UserModel_1.default(userData);
        nueUser.password = (0, Bcrypt_1.generateUserPassword)(nueUser.password);
        yield nueUser.save();
        return nueUser;
    }
    catch (error) {
        throw new Error("error to add");
    }
});
exports.adduser = adduser;
