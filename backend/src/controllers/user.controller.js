import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import { uploadImage } from '../utils/Cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import  jwt  from 'jsonwebtoken'
import mongoose from 'mongoose'
const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //get User details from frontend
    //validation-not empty
    //check if user already exists: username,email
    //check for avatar
    //upload to cloudinary,avatar
    //create user object- create entry in db
    //remove password and refreshToken field from response
    //check for user creation
    //return response

    const { username,fullname, email, password } = req.body
    // console.log("email",email)

    if (
        [username, email,fullname, password].some((field) => field?.trim() === "")
    )
     {
        throw new ApiError(
            400,
            "All fields are mandatory."
        )
    }

    const existedUser= await User.findOne({$or:[{username},{email}]})
    if(existedUser){
        throw new ApiError(
            400,
            "User already exists"
        )
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(
            400,
            "Avatar is required"
        )
    }

    const avatar=await uploadImage(avatarLocalPath)
    if(!avatar){
        throw new ApiError(
            500,
            "Something went wrong while uploading avatar"
        )
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar:avatar.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(
            500,
            "Something went wrong while creating user"
        )
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User created successfully"
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //req-body data
    //username or email
    //find user
    //check password
    //access and refresh token
    //send cookies

    const {email,password}=req.body
    if(!email || !password){
        throw new ApiError(
            400,
            "All fields are mandatory"
        )
    }

    const user = await User.findOne({$or:[{email}]})

    if(!user)
    {
        throw new ApiError(
            404,
            "User not found"
        )
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(
            401,
            "Incorrect password"
        )
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in successfully"
        )
    )
})


const logoutUser = asyncHandler(async (req, res) => {
    //clear cookies
    //remove refreshToken from db
    //send response
    User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined
        }
    },{
        new:true
    })

    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully"
        )
    )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(
            400,
            "Refresh token is required"
        )
    }

    const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user= await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(
            404,
            "User not found"
        )
    }

    if(user.refreshToken !== incomingRefreshToken){
        throw new ApiError(
            401,
            "refresh token expired or used"
        )
    }

    const options={
        httpOnly:true,
        secure:true,
    }

    const {accessToken,newrefreshToken}=await generateAccessAndRefreshToken(user._id)

    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",newrefreshToken,options).json(
        new ApiResponse(
            200,
            {
                accessToken,refreshToken:newrefreshToken
            },
            "Access token refreshed successfully"
        )
    )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {currentPassword,newPassword}=req.body
    if(!currentPassword || !newPassword){
        throw new ApiError(
            400,
            "All fields are mandatory"
        )
    }

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(currentPassword)

    if(!isPasswordCorrect){
        throw new ApiError(
            401,
            "Incorrect current password"
        )
    }

    user.password=newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const {fullname,email}=req.body

    if(!fullname || !email){
        throw new ApiError(
            400,
            "All fields are mandatory"
        )
    }

    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            fullname,email
        }
    },{new:true}).select("-password")

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Account details updated successfully"
        )
    )
})

const updateUserAvatar=asyncHandler(async(req,res)=>{
    const avatarLocalPath=req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(
            400,
            "Avatar is required"
        )
    }

    const avatar=await uploadImage(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(
            400,
            "Something went wrong while uploading avatar"
        )
    }

    const user=await User.findByIdAndUpdate(req.user?._id,{
        $set:{
            avatar:avatar.url
        }
    },{
        new:true
    }).select("-password")

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Avatar updated successfully"
        )
    )
})


const getReadHistory = asyncHandler(async (req, res) => {
    const user= await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from:"stories",
                localField:"readHistory",
                foreignField:"_id",
                as:"readHistory",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"author",
                            foreignField:"_id",
                            as:"author",
                            pipeline:[
                                {
                                    $project:{
                                        fullname:1,
                                        username:1,
                                        avatar:1
                                    }
                                },
                                {
                                    $addFields:{
                                        author:{
                                            $first:"$author"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(
            200,
            user[0].readHistory,
            "Read history fetched successfully"
        )
    )
})

export { registerUser,loginUser,logoutUser,refreshAccessToken, changeCurrentPassword,getCurrentUser,updateAccountDetails,updateUserAvatar,getReadHistory }