import mongoose ,  {Document,Schema} from "mongoose"

export interface IUser extends Document {
    _id:string,
    name:string
    email:string
    password : string
    isAdmin:true
}

const UserSchema : Schema = new Schema ({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})

export default mongoose.model<IUser>("User",UserSchema)