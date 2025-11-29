import ApiError from "../utility/ApiError.js";
import { validateAccessToken } from "../utility/jwt.tokens.js";

const validateUser = (req, res, next) => {
  try {
    let accessToken = req.headers.authorization;

    // trim the token first
    accessToken = accessToken.split(" ")[1];

    const verifyToken = validateAccessToken(accessToken);

    req.user = verifyToken;
    
  } catch (error) {
    console.log(error);
    next(new ApiError(401, error.message));
  }
};

export default validateUser;

// Whenever u try to communicate with jwt via sign() or verify() simply wrap it in try catch even if u need it in middleware
