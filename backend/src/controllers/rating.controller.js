import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { Rating } from '../models/rating.model.js'
import { Story } from '../models/story.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const CreateRating = asyncHandler(async (req, res) => {
    try {
        const { story, user, rating } = req.body
        const newRating = await Rating.create({ story, user, rating })
        res.status(201).json(
            new ApiResponse(
                201,
                newRating,
                "Rating created successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const getRating = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const rating = await Rating.findById(id)
        if (!rating) {
            throw new ApiError(404, "Rating not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                rating,
                "Rating fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

export { CreateRating, getRating }