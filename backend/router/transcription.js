const express = require("express");
const TranscriptionController = require("../controllers/transcription.js");
const path = require('path');
const api = express.Router();
const { v4: uuidv4 } = require('uuid');



//api.post("/transcrip/speechtext", TranscriptionController.request_transcription);

const multer = require('multer');
//const upload = multer();
let uniqueId = null;
// SET STORAGE
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    uniqueId = uuidv4();
    cb(null, uniqueId +'.mp4');
  }
});
var upload = multer({ storage: storage })

api.post('/transcrip/speechtext', upload.single("video"), (req, res) => {
  const video = req.file;
  //const uniqueId = uuidv4();
  console.log(video);
  console.log(`El identificador unico es: ${uniqueId}`);
  //console.log(req.file.path);
  //const basename = path.basename(`${uniqueId}.mp4`.replace(/\\/g, "/"));
  TranscriptionController.request_transcription(req.file.path, uniqueId);
  // Aquí puedes procesar el archivo de video recibido
  const response = {
    uniqueId: uniqueId,
    extension: req.file.path.split('.').pop()
  };
  //res.status(200).send(uniqueId);
  res.status(200).json(response);
  
  //Devolver aquí el nombre del video asignado
});

module.exports = api;