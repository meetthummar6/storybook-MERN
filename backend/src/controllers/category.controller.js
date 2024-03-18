import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { Category } from '../models/category.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json(
            new ApiResponse(
                200,
                categories,
                "Categories fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json( error.message )
    }
})

export { getCategories }