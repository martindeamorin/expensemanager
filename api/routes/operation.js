const express = require("express");
const router = express.Router();
const operationController = require("../controllers/operationController")
const operationMiddleware = require("../middlewares/operationMiddleware")


router.get("/", operationController.getOperations);
router.post("/", operationMiddleware.operationValidation, operationController.createOperation);
router.put("/:id", operationMiddleware.operationValidation, operationController.updateOperation);
router.delete("/:id", operationController.deleteOperation);
router.get("/balance", operationController.getBalance);

module.exports = router