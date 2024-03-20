import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { Vote } from '../models/vote.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const getVote = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const vote = await Vote.findById(id)
        if (!vote) {
            throw new ApiError(404, "Vote not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                vote,
                "Vote fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const CreateVote = asyncHandler(async (req, res) => {
    try {
        const { chapter, user, vote } = req.body
        if (
            [chapter, user, vote].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(
                400,
                "All fields are mandatory."
            )
        }
        const createdVote = await Vote.create({
            chapter,
            user,
            vote
        })
        return res.status(201).json(
            new ApiResponse(
                201,
                createdVote,
                "Vote created successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

export { getVote , CreateVote}