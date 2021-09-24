const { verify } = require("jsonwebtoken");
const CustomError = require("../helpers/customError");
const tokenParser = require("../helpers/tokenParser");



const verifyToken = (req, res, next) => {
    if (!req.originalUrl.includes("/auth")) {
        const authToken = tokenParser(req);

        if (authToken) {
                verify(authToken, process.env.JWT_SECRET, (err, data) => {
                    res.locals.data = data;
                    if(!err){

                        next() 
                    } else{
                        res.clearCookie("remember");
                        res.json(new CustomError(401, "Token de autorización inválido."))
                    }
                })
        } else {
            res.clearCookie("remember")
            return res.json(new CustomError(401, "Necesitas un token de autorización"))
            
        }
    } else {
        return next()
    }
}

module.exports = verifyToken;

