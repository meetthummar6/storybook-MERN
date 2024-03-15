import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const storySchema = new Schema({
    coverImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    reads: {
        type: Number,
        default: 0
    }

},{
    timestamps: true
})

storySchema.plugin(mongooseAggregatePaginate)

export const Story = mongoose.model('Story',storySchema)