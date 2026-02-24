import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    town: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town',
        required: true
    },
    subsection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subsection',
        required: true
    },
    addons: [
        {
            addon: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Addon",
                required: true
            },
            priceSnapshot: {
                type: Number,
                required: true
            }
        }
    ],
    basePriceSnapshot: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    serviceDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    }

}, { timestamps: true })

export const Booking = mongoose.model('Booking', bookingSchema); 