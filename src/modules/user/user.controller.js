import { catchAsync } from "../../utils/catchAsync.js";
import { createUserService, getAllUsersService } from "./user.service.js";
import { sendResponse } from "../../utils/sendResponse.js"


export const createUser = catchAsync(async (req, res) => {
  const data = await createUserService(req.body);
  return sendResponse(res, { statusCode: 201, message: "user created successfully", data})
})

export const getAllUsers = catchAsync(async (req, res) => {
  const data = await getAllUsersService();
  return sendResponse(res, {statusCode: 200, message: "users retrieved successfully", data})
})

export const me = catchAsync(async(req, res) =>{
  const u = req.user;

  sendResponse(res, {
    statusCode: 200,
    message: 'profile fatched', 
    data: {
      id : u._id,
      role: u.role,
      email: u.email || "",
      phone: u.phone || "",
      isActive: u.isActive,
      isBlocked: u.isBlocked,
    },  
  })
})