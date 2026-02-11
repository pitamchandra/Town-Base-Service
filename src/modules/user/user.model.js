import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String},
        email: {type: String, trim: true, lowercase: true, unique: true, sparse: true},
        phone: {type: String, trim: true, unique: true, sparse: true},
        hashPassword: {type: String, select: false},
        address: {type: String},
        role: {type: String, enum : ["customer", "provider", "admin"]},
        isActive: {type: Boolean, default: true},
        isBlocked: {type: Boolean, default: false}
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)