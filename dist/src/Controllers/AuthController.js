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
const express_1 = __importDefault(require("express"));
const AuthServic_1 = require("../Services/AuthServic");
const Bcrypt_1 = require("../../Helpers/Bcrypt");
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nueUser = req.body;
        nueUser.password = (0, Bcrypt_1.generateUserPassword)(nueUser.password);
        const addUser = yield (0, AuthServic_1.register)(nueUser);
        if (!addUser) {
            throw new Error("cant to register this user");
        }
        res.json(nueUser);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userAuth = yield (0, AuthServic_1.login)(user, res);
        res.json(userAuth);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.post("/logout", (req, res) => {
    try {
        (0, AuthServic_1.logout)(res);
        res.status(200).json({ message: "logged out successfully" });
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.default = router;
