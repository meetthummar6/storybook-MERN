import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { Comment } from '../models/comment.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'


const getCommentsByChapter = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const comments = await Comment.find({ chapter: id }).populate('user', 'username')
        if (!comments) {
            throw new ApiError(404, "Comments not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                comments,
                "Comments fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const CreateComment = asyncHandler(async (req, res) => {
    try {
        const { content, chapter, user } = req.body
        if (
            [content, chapter, user].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(
                400,
                "All fields are mandatory."
            )
        }
        const comment = await Comment.create({
            content,
            chapter,
            user
        })
        return res.status(201).json(
            new ApiResponse(
                201,
                comment,
                "Comment created successfully"
            )
        )
    } catch (error) {

        return res.status(error.statusCode || 500).json(error.message)
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByIdAndDelete(id)
        if (!comment) {
            throw new ApiError(404, "Comment not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                comment,
                "Comment deleted successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

export { getCommentsByChapter, CreateComment, deleteComment }