import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import {Chapter} from '../models/chapter.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import mongoose from 'mongoose'

const getChapters = asyncHandler(async (req, res) => {
    try {
        const chapters = await Chapter.find( { story: req.params.id } ).populate('story', 'title')
        return res.status(200).json(
            new ApiResponse(
                200,
                chapters,
                "Chapters fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json( error.message )
    }
})

const getChapter = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await Chapter.findById(id).populate('story', 'title')
        if (!chapter) {
            throw new ApiError(404, "Chapter not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                chapter,
                "Chapter fetched successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const createChapter = asyncHandler(async (req, res) => {
    try {
        const { title, content, story} = req.body
        if (
            [title, content, story].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(
                400,
                "All fields are mandatory."
            )
        }
        const chapter = await Chapter.create({
            title,
            content,
            story,
            chapterno:req.body.chapterno||1,
            option_a:req.body.option_a||"",
            option_b:req.body.option_b||"",
            option_a_link:req.body.option_a_link||"",
            option_b_link:req.body.option_b_link||"",
            option_c:req.body.option_c||"",
            option_c_link:req.body.option_c_link||"",

        })
        return res.status(201).json(
            new ApiResponse(
                201,
                chapter,
                "Chapter created successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const updateChapter = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await Chapter.findByIdAndUpdate(id, req.body, { new: true })
        if (!chapter) {
            throw new ApiError(404, "Chapter not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                chapter,
                "Chapter updated successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

const deleteChapter = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await Chapter.findByIdAndDelete(id)
        if (!chapter) {
            throw new ApiError(404, "Chapter not found")
        }
        res.status(200).json(
            new ApiResponse(
                200,
                chapter,
                "Chapter deleted successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(error.message)
    }
})

export {getChapters,getChapter,createChapter,updateChapter,deleteChapter}