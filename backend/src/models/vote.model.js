import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapter: {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true
    },
    vote: {
        type: String,
        enum: ['option_a', 'option_b', 'option_c'],
        required: true
    }
})

export const Vote = mongoose.model('Vote', voteSchema)