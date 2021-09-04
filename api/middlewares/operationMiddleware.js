const {body} = require("express-validator");

const operationMiddleware = {
    operationValidation : [
        body("type", "Debe seleccionar el tipo de operación.").notEmpty().toBoolean().isBoolean(),
        body("amount", "Debe seleccionar una cantidad.").notEmpty().isNumeric(),
        body("concept", "Debe especificar un concepto.").notEmpty(),
        body("date", "Debe ingresar una fecha").notEmpty().isDate()
    ]
}

module.exports = operationMiddleware;   