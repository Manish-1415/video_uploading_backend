import ApiError from "../utility/ApiError.js";
import { validateRefreshToken } from "../utility/jwt.tokens.js";

const checkRefreshToken = (req , res , next) => {
    // we need to check for the refresh token
    try {
        const refreshToken = req.cookies.refreshToken;

        const payload = validateRefreshToken(refreshToken);

        req.refToken = payload;

        // if token is correct now 
        next();

    } catch (error) {
        console.log(error.name);
        next(new ApiError(500 , error));
    }
}

export default checkRefreshToken;