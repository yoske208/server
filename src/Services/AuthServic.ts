import { comparePassword,generateUserPassword } from "../../Helpers/Bcrypt"
import { generateAuthToken } from "../../Helpers/JWT"
import {CookieOptions,Response} from "express"
import User, { IUser } from "../Modules/UserModel"

const cookieConfig : CookieOptions = {
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 24 * 60 * 60 * 1000
}

interface userDTO {
    email:string,
    password:string
}

interface LoginDTO {
    _id:string,
    isAdmin:boolean

}

const login = async (user: userDTO , res:Response) => {
    try {
        
        const foundUser = await User.findOne({ email: user.email })
        
        if (!foundUser) return  console.log ("User not found")
            
        const isPasswordCorrect =  comparePassword(user.password,foundUser.password)

       console.log(isPasswordCorrect);
    
        if (!isPasswordCorrect) return console.log("Incorrect password or Email");

        const {_id,isAdmin} = foundUser
        const token = generateAuthToken({_id,isAdmin})
        res.cookie("auth_token",token,cookieConfig)
        return {foundUser,token};

    } catch (error) {
        throw new Error("Failed to login")
    }
}

const logout = (res:Response):void => {
    try {
        res.clearCookie("auth_token",{
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        })
    } catch (error) {
        console.log(error);
        
        
    }
}

const register = async (userData:IUser) => {
    try {
        const nueUser = new User(userData)
        if(!userData){
            throw new Error("can not add this new user");
            
        }
        nueUser.password = generateUserPassword(nueUser.password)
        await nueUser.save()
        return nueUser
    } catch (error) {
        throw new Error("error to add")
        
    }

}

export {
    login,
    logout,
    register
}