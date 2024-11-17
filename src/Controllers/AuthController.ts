import express, {IRouter,Request,Response} from "express"
import { login,logout, register } from "../Services/AuthServic"
import { generateUserPassword } from "../../Helpers/Bcrypt"

const router : IRouter = express.Router()

router.post("/register", async(req:Request,res:Response) : Promise <void> => {
    try {
        const nueUser = req.body
        nueUser.password = generateUserPassword(nueUser.password)
        const addUser = await register(nueUser)
        if(!addUser){
            throw new Error("cant to register this user");
            
        }
        res.json(nueUser)
        
    } catch (error : any) {
        console.error(error.message)
        
    }
})

router.post("/login", async(req:Request,res:Response) :Promise<void> => {
    try {
        const user = req.body
        const userAuth = await login(user,res)
        res.json(userAuth)
    } catch (error:any) {
        console.error(error.message)
        
    }
} )

router.post("/logout",(req:Request,res:Response):void => {
    try {
        logout(res)
        res.status(200).json({message: "logged out successfully"})
    } catch (error:any) {
        console.error(error.message)
        
    }
})

export default router