import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
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
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps:true,
})

export const Comment = mongoose.model('Comment', commentSchema)
