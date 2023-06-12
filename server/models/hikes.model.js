const mongoose = require("mongoose");

const HikeSchema = new mongoose.Schema(
    {
    trail:{
        type: String,
        required: [true,"Trail name is required"],
        minlength: [2,"Trail name must be at least 2 characters long"],
        maxlength: [255,"Title cannot be more than 255 characters long"]
        },
    area:{
        type: String,
        required: [true,"Area/Park name is required"],
        minlength: [2,"Area/Park name must be at least 2 characters long"],
        maxlength: [255,"Area/Park name cannot be more than 255 characters long"]
        },
    level:{
        type: String,
        required: [true,"Level info is required"]
        },    
    length:{
        type: Number,
        required: [true,"Length is required"]
        },
    elevation:{
        type: Number,
        required: [true,"Elevation is required"]
        },
    date:{
        type: Date,
        required: [true,"Date is required"]
    },
    time: {
        type:String,
        required: [true,"Time is required"]
    },
    photoUrl: {
        type:String,
        required: [true,"Photo url is required"]
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        },
    },
    {timestamps:true}
)

const Hike = mongoose.model("Hike",HikeSchema)

module.exports = Hike;