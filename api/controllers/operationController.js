const db = require("../database/models/index");
const CustomError = require("../helpers/CustomError");
const SuccessfulResponse = require("../helpers/SuccessfulResponse");
const validateError = require("../helpers/validateError")

const operationController = {
    getOperations : async (req, res) => {

        let operations;
        let totalRecords;
        try{
            operations = await db.Operation.findAndCountAll({where: {user_id: res.locals.data.id},offset: Number(req.query.offset), limit : 10, order : [["created_at", "DESC"]]})
            totalRecords = await db.Operation.count({where: {user_id: res.locals.data.id}})

        }catch(err){
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente"))
        }
        let response = {data : operations.rows, queryRecords : operations.count, totalRecords}
        return res.json(new SuccessfulResponse(200, undefined, response))
    },
    createOperation : async (req, res) => {
        try {
            await validateError(req)
        } catch (err) {
            return res.json(err)
        }
        try{
            await db.Operation.create({...req.body, user_id: res.locals.data.id})
        }catch{
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente"))

        }
        return res.json(new SuccessfulResponse(201, "Se ha creado con la operación", undefined))

    },
    updateOperation : async (req, res) => {
        try {
            await validateError(req)
        } catch (err) {
            return res.json(err)
        }
        const {id, ...rest} = req.body
        try{
            await db.Operation.update({...rest}, {where : {id : req.params.id}})
        }catch{
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente"))

        }
        return res.json(new SuccessfulResponse(200, "Se ha actualizado con exito la operacion", undefined))
    },
    deleteOperation : async (req, res) => {
        try{
            await db.Operation.destroy({where : {id : req.params.id}})
        }catch(err){
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente"))

        }
        return res.json(new SuccessfulResponse(200, "Se ha eliminado con exito la operacion", undefined))
    },
    getBalance : async (req, res) => {

        let income, egress, balance;

        try{
            income = await db.Operation.sum("amount", {where : {user_id: res.locals.data.id, type: 1}}) || 0
            egress = await db.Operation.sum("amount", {where : {user_id: res.locals.data.id, type: 0}}) || 0
            balance = income - egress;
        }catch(err){
            return res.json(new CustomError(500, "Ocurrio un error interno, intentelo nuevamente"))

        }

        let balanceData = {balance, income, egress};

        return res.json(new SuccessfulResponse(200, undefined, balanceData))

    }
}

module.exports = operationController;