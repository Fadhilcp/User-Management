import { Request , Response } from "express";
import User from "../../models/userSchema";

import bcrypt from 'bcryptjs'

import { generateToken } from "../../utils/generateToken";
import { v2 as cloudinary } from "cloudinary";

//register user
export const signUp = async(req:Request , res:Response) : Promise<void> => {
    try { 
        
        const {name , email , password} = req.body

        const userExists = await User.findOne({email})

        if(userExists) {
             res.status(401).json({message : 'User already exists!'})
             return
        }

        const hashPassword = await bcrypt.hash(password , 10)

        const user = await User.create({name , email , password : hashPassword})

        const token = generateToken(user._id.toString())

        const userObj = user.toObject()

        const { password : _ , ...userData} = userObj

         res.status(201).json({user : userData , token})

    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({message : 'Server error' , error : error.message})
        }else{
            res.status(500).json({ message: 'Server error', error: 'Unknown error' })
        }
    }
}


//login user
export const signIn = async(req : Request , res : Response) : Promise<void> => {
    try {
        
        const {email , password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            res.status(401).json({message : 'User doesnt Exist!'})
            return
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
           res.status(401).json({ message: 'Invalid credentials' })
           return
        }

        const token = generateToken(user._id.toString())

        const userObj = user.toObject()
        const { password: _, ...userData } = userObj

        res.status(201).json({user : userData , token})

    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({message : 'Server error' , error : error.message})
        }else{
            res.status(500).json({ message: 'Server error', error: 'Unknown error' })
        }
    }
}

//verify token an set user
export const verifyToken = async(req : Request , res : Response ) => {
    const user = req.user
    res.status(200).json({user})
}

//update profile 
export const updateProfile = async (req : Request , res : Response) : Promise<void> => {

    try {

        const user = await User.findById(req.user._id)

        if(!user){
            res.status(404).json({message :'User Not Found!'})
            return 
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        //destroy and set new img
        if (req.file?.path && req.file?.filename) {
            if(user.photoPublicId){
                await cloudinary.uploader.destroy(user.photoPublicId)
            }
           user.photo = req.file.path;
           user.photoPublicId = req.file.filename
        }

        const updatedUser = await user.save()

        const { password : _ , ...userData } = updatedUser.toObject()

        res.status(200).json({ user: userData })
        
    } catch (error : any) {
        res.status(500).json({
            message: error.message || 'Server error',
            error: JSON.stringify(error, null, 2)
        })
    }
}