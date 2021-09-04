let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let authRouter = require("./routes/auth.js")
let operationRouter = require("./routes/operation.js")
let cors = require("cors")
let {config} = require("dotenv");
let verifyToken = require('./middlewares/verifyToken.js');
var app = express();
config({path : "./.env"})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(verifyToken)
app.use("/auth", authRouter)
app.use("/operations", operationRouter)



module.exports = app;
