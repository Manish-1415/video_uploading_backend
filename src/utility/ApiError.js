
class ApiError extends Error {
    constructor(statusCode , message="Something went wrong") { // own methods
        super(message); 
        this.success = false;
        this.statusCode = statusCode;

        Error.captureStackTrace(this , this.constructor); // it will not show the err is coming from apierror , it will give only origin from where the err started.
    }
}

export default ApiError;