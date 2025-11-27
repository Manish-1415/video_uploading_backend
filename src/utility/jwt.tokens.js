import jwt from "jsonwebtoken";
import ApiError from "./ApiError";

export const accessTokenCreation = (payload) => {
    try {   
        return jwt.sign(
            payload,
            process.env.ACCESS_SECRET_KEY,
            {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500 , error.name);
    }
}

export const refreshTokenCreation = (payload) => {
    try {
        return jwt.sign(
            payload,
            process.env.REFRESH_SECRET_KEY,
            { expiresIn : process.env.REFRESH_TOKEN_EXPIRY }
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(500 , error.name);
    }
}