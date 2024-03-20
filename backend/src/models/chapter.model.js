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
    },
    option_a_link:{
        type:Schema.Types.ObjectId,
        ref:'Chapter'
    },
    option_b:{
        type:String,
    },
    option_b_link:{
        type:Schema.Types.ObjectId,
        ref:'Chapter'
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
