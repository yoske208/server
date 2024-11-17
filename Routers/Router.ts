import  express, {IRouter, NextFunction, Request, Response} from "express";
import dataController from "../src/Controllers/DataController"
import authController from "../src/Controllers/AuthController"
import { verifyAdmin, verifyUser } from "../Helpers/JWT";

const router:IRouter = express.Router()

router.use("/data",verifyUser as NextFunction, dataController) 
router.use("admin-role",verifyAdmin as NextFunction,dataController)
router.use("/auth",authController) 
// router.use((res:Response,req:Request) => {
//     HendaleError(res,404,"the page is not found")
// })

export default router
