import mongoose,{Schema} from 'mongoose'

const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    story: {
        type: Schema.Types.ObjectId,
        ref:'Story',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
})

export const Rating = mongoose.model('Rating', ratingSchema)