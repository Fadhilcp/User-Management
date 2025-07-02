import jwt from 'jsonwebtoken'
import User from '../models/userSchema'
import { Request , Response , NextFunction } from 'express'


interface JwtPayload {
    id : string
}

declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

//checks the token
export const authMiddleware = async (req : Request,res :Response, next : NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        
        res.status(401).json({message : 'No token provided'})
        return
    }

    const token = authHeader.split(' ')[1]

    try {

        const secret =  process.env.JWT_SECRET

        if(!secret) throw new Error('JWT SECRET not found')

        const decoded = jwt.verify(token, secret) as JwtPayload

        const user = await User.findById(decoded.id).select('-password')

        if(!user) {
            res.status(401).json({message : 'User not found'})
            return
        }

        req.user = user
        next()
        
    } catch (error) {
        res.status(401).json({message : 'invalid token'})
    }
}