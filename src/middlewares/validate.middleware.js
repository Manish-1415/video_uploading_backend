import ApiError from "../utility/ApiError.js"

const validationMiddleware = (schema) => (req , res , next) => {
    const {error} = schema.validate(req.body , {aboartEarly : false});

    if(error) {
        let errMsg = error.details.map( (err) => err.message ).join(",");

        return next(new ApiError(400 , errMsg));
    }
    next();
}

export default validationMiddleware;