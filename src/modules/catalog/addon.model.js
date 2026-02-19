import mongoose from "mongoose";
const addonSchema = new mongoose.Schema({
    subsection : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subsection",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    isActive : {
        type: Boolean,
        default: true,
    }

}, {timestamps: true})

addonSchema.index({subsection: 1, name: 1}, {unique: true})
export const Addon = mongoose.model('Addon', addonSchema)