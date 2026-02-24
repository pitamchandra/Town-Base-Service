import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";
import { Booking } from "./booking.model.js";
import { Subsection } from "../catalog/subsection.model.js";
import { Addon } from "../catalog/addon.model.js";
import { Town } from "../town/town.model.js";


export const createBooking = catchAsync( async (req, res) => {
    const { town, subsection, addons = [], serviceDate, address } = req.body;
    if(!town, !subsection, !serviceDate, !address) {
        throw new AppError('all required fields must be provided', 400);
    }
    const townExists = await Town.findById(town);
    if(!townExists && !townExists.isActive) {
        throw new AppError('Invalid or inactive town', 400);
    }

    const subsectionDoc = await Subsection.findById(subsection);
    if(!subsectionDoc && !subsectionDoc.isActive){
        throw new AppError('invalid or inactive subsection', 400);
    }

    const basePrice = subsectionDoc.basePrice;
    let totalAmount = basePrice;

    const addonSnapshots = []

    if(addons.length > 0){
        const addonDocs = await Addon.find({
            _id: { $in : addons},
            subsection: subsection,
            isActive : true
        })
        if(addonDocs.length !== addons.length){
            throw new AppError('invalid or inactive addons', 400)
        }
        addonDocs.forEach(addon => {
            totalAmount += addon.price;

            addonSnapshots.push({
                addon: addon._id,
                priceSnapshot: addon.price
            })
        });
    }
    const booking = await Booking.create({
        customer: req.user._id,
        town,
        subsection,
        addons: addonSnapshots,
        basePriceSnapshot: basePrice,
        totalAmount,
        serviceDate,
        address
    })

    return sendResponse(res, {
        statusCode: 201,
        message: 'booking service successfully',
        data: booking,
    })
})