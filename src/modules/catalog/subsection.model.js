import mongoose from "mongoose";
import { Category } from "./category.model.js";

const subsectionSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    durationMin: {
        type: Number,
        required: true,
        min: 1,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

subsectionSchema.index({ Category: 1, name: 1 }, { unique: true })

export const Subsection = mongoose.model("Subsection", subsectionSchema)