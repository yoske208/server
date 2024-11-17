import { generateUserPassword } from "../../Helpers/Bcrypt"
import User, {IUser} from "../Modules/UserModel"

const alluser = async () => {
    try {
        const alluser = User.find()
        return alluser
        
    } catch (error) {
        throw new Error("error to find users")
        
    }
}

const findUser = async (userId:string) => {
    try {
        const user = await User.findById(userId)
        if(!user){
            return console.log("nut find this user");
            
        }
        return user
        
    } catch (error) {
        throw new Error("error to find this user")
        
    }
}

const deleteUser = async (userId:IUser) => {
    try {
        
        const user = await User.findOneAndDelete(userId.id)
        if(!user){
            throw new Error("user not find")
        }
        
        return user;
        
    } catch (error) {
        throw new Error("error to delete this user")
        
    }
}

const deleteAll = async () => {
    try {
        const users = await User.deleteMany()
    } catch (error) {
        throw new Error("error to find users")
        
    }
}

const updateUser = async (userData:IUser) => {
    
    try {
        const nueUser = await User.findOneAndUpdate(userData.id,userData,{new : true})
       
        
        return await nueUser?.save()
    } catch (error) {
        throw new Error("error to edit user")
        
    }
}

const adduser = async (userData:IUser) => {
    try {
        const nueUser = new User(userData)
        nueUser.password = generateUserPassword(nueUser.password)
        await nueUser.save()
        return nueUser
    } catch (error) {
        throw new Error("error to add")
        
    }

}



export{
    alluser,
    findUser,
    deleteUser,
    deleteAll,
    updateUser,
    adduser,
    

}