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
const DataServic_1 = require("../Services/DataServic");
const hendaleError_1 = require("../Utils/hendaleError");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield (0, DataServic_1.alluser)();
        if (!getAll) {
            (0, hendaleError_1.hendaleError)(res, 401, "not found users");
        }
        res.json(getAll);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.params.id;
        const getById = yield (0, DataServic_1.findUser)(newUser);
        res.json(getById);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nueUser = req.body;
        const addUser = yield (0, DataServic_1.adduser)(nueUser);
        res.json(nueUser);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const editUser = yield (0, DataServic_1.updateUser)(newUser);
        res.json(editUser);
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const editUser = yield (0, DataServic_1.deleteUser)(newUser);
        res.send("delete by id");
    }
    catch (error) {
        console.error(error.message);
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editUser = yield (0, DataServic_1.deleteAll)();
        res.send("delete by id");
    }
    catch (error) {
    }
}));
exports.default = router;
