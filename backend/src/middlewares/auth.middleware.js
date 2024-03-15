import ApiError from '../utils/ApiError.js'
import  Jwt  from 'jsonwebtoken'
import { User } from '../models/user.model.js'


export const verifyJWT = async(req, _, next) => {
try {
        const token= req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        if(!token){
            throw new ApiError(401, "Not authorized")
        }
    
        const decodedToken=Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user=user
        next()
} catch (error) {
    throw new ApiError(401, "Invalid access token")
}
}