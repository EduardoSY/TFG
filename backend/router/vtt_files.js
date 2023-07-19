const express = require("express");
const VTTFilesController = require("../controllers/vtt_files");

const api = express.Router();

api.get("/vttfiles/:id", VTTFilesController.get_transcription_files);
api.get("/vttfiles/download/:file", VTTFilesController.downloadVTTFile);

module.exports = api;
