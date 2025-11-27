import { validateAccessToken } from "../utility/jwt.tokens.js";

const validateUser = (req, res, next) => {
  let accessToken = req.headers.authorization;

  // trim the token first
  accessToken = accessToken.split(" ")[1];

  const verifyToken = validateAccessToken(accessToken);

  if(verifyToken) {
    req.user = verifyToken;

    next();
  }

};

export default validateUser;
