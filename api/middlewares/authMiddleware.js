const {body} = require("express-validator");
const db = require("../database/models/index")

const usersMiddleware = {

    registerValidation : [
        body("email", "Debes ingresar un email").notEmpty().isEmail(),
        body("email").custom((value) => {
            return db.User.findOne({where : {email : value}}).then(function(response){
                if(response){
                    return Promise.reject("El email esta en uso")
                }
            })
        }),
        body("rptEmail", "El email debe coincidir").notEmpty().custom((value, {req}) => {
            if(!(req.body.email === value)){
                return false;
            }
            return true;
        }),
        body("password", "Tu contraseña debe tener 8 caracteres, una mayuscula, una minuscula y un numero").notEmpty().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
        body("rptPassword", "La contraseña debe coincidir").notEmpty().custom((value, {req}) => {
            if(!(req.body.password === value)){
                return false;
            }
            return true;
        })
    ],
    loginValidation : [
        body("email", "Es necesario un mail").notEmpty(),
        body("password", "Es necesaria una contraseña").notEmpty(),
    ]

}

module.exports = usersMiddleware;