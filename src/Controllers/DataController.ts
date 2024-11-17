import express,{IRouter,Request,Response} from "express"
import { adduser, alluser, deleteAll, deleteUser, findUser, updateUser } from "../Services/DataServic"
import { IUser } from "../Modules/UserModel"
import { hendaleError } from "../Utils/hendaleError"

const router : IRouter = express.Router()
router.get("/",async (req : Request, res : Response) : Promise<void> => {
    try {
        const getAll = await alluser()
        if(!getAll){
            hendaleError(res,401,"not found users")
        }

        res.json(getAll)
        
    } catch (error:any) {
        console.error(error.message)
        
    }
})

router.get("/:id",async(req:Request,res :Response) : Promise<void> => {
    try {
        const newUser = req.params.id

        const getById = await findUser(newUser)
        res.json(getById)
        
    } catch (error : any) {
        console.error(error.message)
        
    }
})

router.post("/" , async(req:Request,res :Response) : Promise<void> => {
    try {
        const nueUser = req.body
        const addUser = await adduser(nueUser)
        res.json(nueUser)
        
    } catch (error : any) {
        console.error(error.message)
        
    }
})

router.put("/:id" , async(req:Request,res:Response) :Promise<void> => {
    try {
        const newUser = req.body
        
        const editUser = await updateUser(newUser)
        
        res.json(editUser)
        
    } catch (error :any) {
        console.error(error.message)

        
    }
})
router.delete("/:id",async(req:Request,res:Response) :Promise<void> => {
    try {
        const newUser = req.body
        const editUser = await deleteUser(newUser)
        res.send("delete by id")
        
    } catch (error :any) {
        console.error(error.message)
        
    }
})
router.delete("/" ,async(req:Request,res:Response) : Promise<void> => {
    try {
        const editUser = await deleteAll()
        res.send("delete by id")
        
    } catch (error) {
        
    }
})
export default router