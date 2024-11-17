"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DataController_1 = __importDefault(require("../src/Controllers/DataController"));
const AuthController_1 = __importDefault(require("../src/Controllers/AuthController"));
const JWT_1 = require("../Helpers/JWT");
const router = express_1.default.Router();
router.use("/data", JWT_1.verifyUser, DataController_1.default);
router.use("admin-role", JWT_1.verifyAdmin, DataController_1.default);
router.use("/auth", AuthController_1.default);
// router.use((res:Response,req:Request) => {
//     HendaleError(res,404,"the page is not found")
// })
exports.default = router;
