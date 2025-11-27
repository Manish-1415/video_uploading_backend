import jwt from "jsonwebtoken";

export const accessTokenCreation = (payload) => {
    try {   
        return jwt.sign(
            payload,
            process.env.ACCESS_SECRET_KEY,
            {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
        )
    } catch (error) {
        console.log(error);
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
    }
}


export const validateAccessToken = (token) => {
    try {
        return jwt.verify(token , process.env.ACCESS_SECRET_KEY);
    } catch (error) {
        console.log(error);
    }
}


export const validateRefreshToken = (token) => {
    try {
        return jwt.verify(token , process.env.REFRESH_SECRET_KEY);
    } catch (error) {
        console.log(error)
    }
}