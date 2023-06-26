const express = require("express");
const streamDataController = require("../controllers/stream_data");

const api = express.Router();

api.get('/stream/video/:id', streamDataController.streamData);

module.exports = api;