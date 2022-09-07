const AppError = require('./AppError');

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

const handleValidationErr = err => {
    
    return new AppError(`Validation error...${err.message}`, 400)
}


module.exports = {wrapAsync, handleValidationErr} 
