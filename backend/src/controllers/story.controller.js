import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { Story } from '../models/story.model.js'
import { uploadImage } from '../utils/Cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const getStories = asyncHandler(async (req, res) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: 8
        }
        const stories = await Story.find({ isPublished: true }).populate('author', 'username').populate('category', 'name').sort({ createdAt: -1 }).skip(options.page * options.limit - options.limit).limit(options.limit)
        return res.status(200).json(
            new ApiResponse(
                200,
                stories,
                "Stories fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const getUserStories = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const stories = await Story.find({ author: id }).populate('author', 'username').populate('category', 'name')
        return res.status(200).json(
            new ApiResponse(
                200,
                stories,
                "Stories fetched successfully"
            )
        )
    }
    catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const getStory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const story = await Story.findById(id).populate('author', 'username').populate('category', 'name')
        if (!story) {
            throw new ApiError(404, "Story not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                story,
                "Story fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const createStory = asyncHandler(async (req, res) => {
    try {
        const { title, description, category, isPublished, author } = req.body
        if (
            [title, description, category, isPublished, author].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(
                400,
                "All fields are mandatory."
            )
        }
        const coverImagePath = req.file?.path
        if (!coverImagePath) {
            throw new ApiError(
                400,
                "Cover image is required"
            )
        }

        const coverImage = await uploadImage(coverImagePath)
        if (!coverImage.url) {
            throw new ApiError(
                500,
                "Something went wrong while uploading the cover image"
            )
        }
        const story = await Story.create({
            title,
            description,
            coverImage: coverImage.url,
            category,
            isPublished,
            author
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                story,
                "Story created successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const updateStory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const story = await Story.findByIdAndUpdate(id, req.body, { new: true })
        if (!story) {
            throw new ApiError(404, "Story not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                story,
                "Story updated successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const deleteStory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const story = await Story.findByIdAndDelete(id)
        if (!story) {
            throw new ApiError(404, "Story not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                story,
                "Story deleted successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

export { getStories, getStory, createStory, updateStory, deleteStory,getUserStories }