import User from "../../models/userSchema";
import { Response , Request } from "express";
import bcrypt from 'bcryptjs'
import { generateToken } from "../../utils/generateToken";


export const loginAdmin = async(req : Request , res : Response ) => {
    try {

        const { email , password } = req.body

        const admin = await User.findOne({email , isAdmin : true})

        if(!admin){
            res.status(404).json({message : 'Admin not found!'})
            return 
        }

        const isMatch = await bcrypt.compare(password , admin.password) 
        
        if(!isMatch){
            res.status(401).json({message : 'Invalid Password'})
            return
        }

        const token = generateToken(admin._id.toString())

        res.status(200).json({token , admin : {id : admin._id , name : admin.name , email : admin.email}})

    } catch (error : any) {
        console.log('login admin error',error)
        res.status(500).json({message : 'Internal Server error'})
    }
}