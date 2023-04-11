const express = require("express");
const TranscriptionController = require("../controllers/transcription.js");

const api = express.Router();

//api.post("/transcrip/speechtext", TranscriptionController.request_transcription);

const multer = require('multer');
//const upload = multer();

// SET STORAGE
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+'.mp4');
  }
});
var upload = multer({ storage: storage })

api.post('/transcrip/speechtext', upload.single("video"), (req, res) => {
  const video = req.file;
  console.log(video);
  TranscriptionController.request_transcription(req.file.path)
  // Aquí puedes procesar el archivo de video recibido
  res.send('Video recibido');
});

module.exports = api;