import AppError from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { Town } from './town.model.js';


export const getTowns = catchAsync(async (req, res) =>{
    const towns = await Town.find({isActive: true}).sort({name: 1});
    return sendResponse(res, {
        statusCode: 200,
        message: "Town fetch successfully",
        data: towns
    })
})

export const createTown = catchAsync(async (req, res) => {
    const name = String(req.body?.name || '').trim();
    if(!name) throw new AppError('name is requred', 400);

    const town = await Town.create({ name })

    return sendResponse(res, {
        statusCode: 201,
        message: "Town created",
        data: town,
    })
})

export const updateTown = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = {};

    if (req.body?.name !== undefined) payload.name = String(req.body.name).trim();
    if (req.body?.isActive !== undefined) payload.isActive = Boolean(req.body.isActive);

    if(payload?.name !== undefined && !payload.name){
        throw new AppError("Town name can not be empty", 400)
    }
    
    const town = Town.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })

    if(!town) throw new AppError('town not found', 404);

    return sendResponse(res, {
        statusCode: 200,
        message: "the town name is updated",
        data: town
    })
})

