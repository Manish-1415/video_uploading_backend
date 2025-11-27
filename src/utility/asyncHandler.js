
const asyncHandler = (fn) => async () => {
    Promise.resolve(fn(req , res)).catch(next)
}

export default asyncHandler;