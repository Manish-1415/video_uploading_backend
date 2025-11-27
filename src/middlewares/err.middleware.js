const errorMiddleware = (err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;


    return res
    .status(statusCode)
    .json({success : err.success , statusCode , message});
} 


export default errorMiddleware;