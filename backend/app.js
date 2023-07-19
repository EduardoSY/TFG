const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {API_VERSION} = require("./constants");
const multer = require("multer");

const app = express();
const upload = multer();

//Imports routing
const transcriptionRoutes = require("./router/transcription");
const vttFilesRoutes = require("./router/vtt_files");
const translateRoutes = require("./router/translation");
const streamRoutes = require("./router/stream_data");

//Configure body parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configue CORS
app.use(cors());

//Configure Routing
app.use(`/api/${API_VERSION}`, transcriptionRoutes);
app.use(`/api/${API_VERSION}`, vttFilesRoutes);
app.use(`/api/${API_VERSION}`, translateRoutes);
app.use(`/api/${API_VERSION}`, streamRoutes);

module.exports = app;