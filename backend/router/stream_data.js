const express = require("express");
const streamDataController = require("../controllers/stream_data");

const api = express.Router();

api.get("/stream/video/:id", streamDataController.streamDataVideo);
api.get("/stream/:id", streamDataController.streamData);
api.delete("/stream/:id", streamDataController.deleteData);

module.exports = api;
