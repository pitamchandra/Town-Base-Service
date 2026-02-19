import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";
import { Subsection } from "./subsection.model.js";
import { Addon } from "./addon.model.js";

export const getAddons = catchAsync( async (req, res) => {
    const { subsectionId } = req.query;
    const filter = { isActive : true };
    if(subsectionId) filter.subsection = subsectionId;
    const addons = await Addon.find(filter).populate('subsection', 'name').sort({name: 1});
    return sendResponse(res, {
        statusCode:200,
        message: "addons are fatched",
        data: addons
    })
})

export const createAddon = catchAsync(async(req, res)=>{
    const {subsection, name, price } = req.body;
    if(!subsection || !name || price == null) {
        throw new AppError('subsection , name, and price are required', 400)
    }
    const existSubsection = await Subsection.findById(subsection);
    if(!existSubsection){
        throw new AppError('subsection not found', 404)
    }
    const addon = await Addon.create({
        subsection,
        name: String(name).trim(),
        price
    })
    return sendResponse(res, {
        statusCode: 201,
        message: "addon created",
        data: addon
    })
})