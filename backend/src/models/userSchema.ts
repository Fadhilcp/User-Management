import { Schema , model , Document , Types} from "mongoose";

export interface IUser  {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  photo ?: string;
  photoPublicId?: string;
}

export interface UserDocument extends Document , IUser {
    _id: Types.ObjectId
}

const userSchema = new Schema<UserDocument>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    photo: {
      type: String,
      default: "",
    },
    photoPublicId : {
        type : String ,
        default : ''
    }
    ,
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
} , {timestamps : true })

const User =  model<UserDocument>('User' , userSchema)
export default User