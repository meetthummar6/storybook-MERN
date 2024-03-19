import mongoose,{Schema} from "mongoose";
const chapterSchema = new Schema({
    story:{
        type:Schema.Types.ObjectId,
        ref:'Story',
        required: true
    },
    chapterno:{
        type:Number,
        default:1
    },
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    option_a:{
        type:String,
        required: true
    },
    option_a_link:{
        type:Schema.Types.ObjectId,
        ref:'Chapter',
        required:true
    },
    option_b:{
        type:String,
        required: true
    },
    option_b_link:{
        type:Schema.Types.ObjectId,
        ref:'Chapter',
        required:true
    },
    option_c:{
        type:String,
    },
    option_c_link:{
        type:Schema.Types.ObjectId,
        ref:'Chapter'
    },
},{
    timestamps:true
})

export const Chapter = mongoose.model('Chapter',chapterSchema)
