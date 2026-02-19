import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";
import { Subsection } from "./subsection.model.js";
import { Category } from "./category.model.js";

export const getSubsections = catchAsync(async (req, res) => {
    const { categoryId } = req.query;

    const filter = { isActive: true };
    if(categoryId) filter.category = categoryId;
    const subsections = await Subsection.find(filter).populate("category", "name").sort({name: 1});
    return sendResponse(res, {
        statusCode: 200,
        message: "subsection fatched",
        data: subsections
    })
})

export const createSubsection = catchAsync(async (req, res) => {
    const {category, name, basePrice, durationMin} = req.body;
    if(!category || !name || basePrice==null || durationMin==null){
        throw new AppError('category, name, basePrice, durationMin fields are required', 400)
    }

    const categoryExists = await Category.findById(category);
    if(!categoryExists) {
        throw new AppError('category not found', 404);
    }

    const subsection = await Subsection.create({
        category,
        name: String(name).trim(),
        basePrice,
        durationMin
    })

    return sendResponse(res, {
        statusCode: 201,
        message: 'subsection created',
        data: subsection
    })
})