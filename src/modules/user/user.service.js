
import AppError from "../../utils/AppError.js";
import { User } from "./user.model.js";

export const createUserService = async (payload) => {
    const role = String(payload?.role || "").trim();
    const email = payload?.email ? String(payload.email).trim().toLowerCase() : null;
    const phone = payload?.phone ? String(payload.phone).trim() : null;

    if(!["customer", "provider", "admin"].includes(role)){
        throw new AppError("invalid role", 400)
    }

    if(!email && !phone){
        throw new AppError("email or phone required", 400)
    }

    const user = await User.create({
        role,
        email: email || undefined,
        phone: phone || undefined,
    })

    return {
        id: user._id,
        role: user.role,
        email: user.email || null,
        phone: user.phone || null,
    }

}

export const getAllUsersService = async () =>{
    const users = await User.find();
    return users;
}