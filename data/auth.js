import { user } from "./user.js";
import { CustomException } from "../helpers.js";

export const login = async (emailAddress, password) => {
    const foundUser = await user.findOne({ 
        "emailAddress": emailAddress,
        "password": password
    });
    if(!foundUser) throw CustomException.unauthorized(emailAddress);
    delete foundUser['password'];
    return foundUser;
}