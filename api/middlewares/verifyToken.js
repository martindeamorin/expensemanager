const { verify } = require("jsonwebtoken");
const CustomError = require("../helpers/customError");



const verifyToken = (req, res, next) => {

    if (!req.originalUrl.includes("/auth")) {
        if (typeof (req.headers.authorization) !== "undefined") {
            const authToken = req.headers.authorization.split(" ")[1]


                verify(authToken, process.env.JWT_SECRET, (err, data) => {
                    res.locals.data = data;
                    !err ?
                        next() :
                        res.json(new CustomError(401, "Token de autorización inválido."))
                })
        } else {
            return res.json(new CustomError(401, "Necesitas un token de autorización"))
        }
    } else {
        return next()
    }
}

module.exports = verifyToken;

