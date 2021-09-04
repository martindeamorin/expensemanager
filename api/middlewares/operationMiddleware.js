const {body} = require("express-validator");

const operationMiddleware = {
    operationValidation : [
        body("type", "Debe seleccionar el tipo de operación.").notEmpty().toBoolean().isBoolean(),
        body("amount", "Debe seleccionar una cantidad (valor positivo)").notEmpty().isNumeric().custom((value) => {
            return value > 0;
        }),
        body("concept", "Debe especificar un concepto (solo letras)").notEmpty().matches(new RegExp(/^[a-zA-Z\s]*$/)),
        body("date", "Debe ingresar una fecha").notEmpty().isDate()
    ]
}

module.exports = operationMiddleware;   