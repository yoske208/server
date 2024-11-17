"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const Router_1 = __importDefault(require("./Routers/Router"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(Router_1.default);
// app.use((req,res) => {
//     errorHendale(res,404,"Page not found!!!!!!!")
// })
mongoose_1.default.connect(process.env.MONGO_DB || "")
    .then(() => console.log("connect to db   "))
    .catch((error) => console.error("error to conect", error));
app.listen(process.env.PORT || 4000, () => {
    console.log(` listen to port http://localhost: ${process.env.PORT || 4000} }  `);
});
