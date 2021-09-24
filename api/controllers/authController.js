const CustomError = require("../helpers/CustomError")
const SuccessfulResponse = require("../helpers/SuccessfulResponse")
const validateError = require("../helpers/validateError")
const db = require("../database/models/index");
const {compareSync, hashSync} = require("bcryptjs")
const {sign} = require("jsonwebtoken")

const authController = {
    register: async (req, res) => {
        try {
            await validateError(req)
        } catch (err) {
            return res.json(err)
        }

        req.body.password = hashSync(req.body.password, 10)

        const { password, email } = req.body;
        

        try {
            await db.User.create({ email, password })
        } catch {
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente", undefined))
        }

        return res.json(new SuccessfulResponse(201, "Se ha creado con exito el usuario", undefined))
    },
    login: async (req, res) => {

        try {
            await validateError(req)
        } catch (err) {
            return res.json(err)
        }

        const { email, password } = req.body;

        let userCoincidence = await db.User.findOne({ where: { email: email } })

        if (userCoincidence) {

            if (compareSync(password, userCoincidence.password)) {

                userCoincidence.password = "";

                const userData = userCoincidence;
                const response = new SuccessfulResponse(200, "Usuario logueado con éxito");
                    
                    sign(JSON.stringify(userData), process.env.JWT_SECRET, function (err, token) {
                        if(!err){
                            res.cookie("remember", "true", { maxAge: 31536000000, httpOnly: false, overwrite: true })
                            res.cookie('token' , token, { maxAge: 31536000000, httpOnly: true, overwrite: true })
                            return res.json({ ...response, token });
                        } else{
                            return res.json(new CustomError(500, "Ocurrio un error en el servidor, intentelo de nuevo, por favor."));
                        }
                    });

            } else{
                return res.json(new CustomError(401, "El email o la contraseña es incorrecto.", undefined))
            }
        } else{
            return res.json(new CustomError(401, "El email o la contraseña es incorrecto.", undefined))
        }
    },

    logout: (req, res) => {
        res.clearCookie("remember");
        res.clearCookie("token");
        return res.json( new SuccessfulResponse(200, "Usuario deslogueado con éxito"))
    }
}


module.exports = authController;