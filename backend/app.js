const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {API_VERSION} = require("./constants");
const multer = require("multer");

const app = express();
const upload = multer();
//Imports routing
const transcriptionRoutes = require("./router/transcription")

//Configure body parse
//app.use(bodyParser.raw({type: 'application/octet-stream'}))
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
//Configue CORS
app.use(cors());
//Configure Routing
app.use(`/api/${API_VERSION}`, transcriptionRoutes)
module.exports = app;