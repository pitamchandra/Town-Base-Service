import { sendResponse } from "../../utils/sendResponse.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { Category } from "./category.model.js";
import AppError from "../../utils/AppError.js";

export const getCategories = catchAsync( async (req, res) => {
    const data = await Category.find({isActive: true}).sort({name: 1});
    return sendResponse(res, {
        statusCode: 200,
        message: "categories fatched",
        data
    })
})

export const createCategory = catchAsync(async (req, res) => {
    const payload = req.body;
    const name = String(payload?.name || '').trim()
    const icon = String(payload?.icon || '').trim()

    if(!name) throw new AppError("category name is required", 400);

    const category = await Category.create({name, icon});
    return sendResponse(res, {
        statusCode: 201,
        message: "category created",
        data: category
    })
    
})