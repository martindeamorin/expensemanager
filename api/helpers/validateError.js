const { validationResult } = require("express-validator");
const CustomError = require("../helpers/CustomError")


let validateError = (req) => {

    const errors= validationResult(req)
    
    if (!errors.isEmpty()) {
        
    
        throw new CustomError(400, undefined, errors.array({ onlyFirstError: true }).filter(e => e.msg !== "Invalid value"));
    
    }
}

module.exports = validateError;