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
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    uniqueId = uuidv4();
    cb(null, uniqueId +'.mp4');
  }
});
var upload = multer({ storage: storage })

api.post('/transcrip/speechtext', upload.single("video"), async (req, res) => {
  const video = req.file;
  //console.log(req);
  //const uniqueId = uuidv4();
  //console.log(video);
  console.log(`El identificador unico es: ${uniqueId}`);
  //console.log(req.file.path);
  //const basename = path.basename(`${uniqueId}.mp4`.replace(/\\/g, "/"));
  const resultRequest = await TranscriptionController.request_transcription(req.file.path, uniqueId, req.body.language);
  console.log("AAAA QUIERO MORIR");
  console.log(resultRequest);
  TranscriptionController.writeFile(resultRequest);
  // Aquí puedes procesar el archivo de video recibido
  const response = {
    uniqueId: uniqueId,
    extension: req.file.path.split('.').pop(),
    taskID: resultRequest.taskID
  };
  //res.status(200).send(uniqueId);
  res.status(200).json(response);
  
  //Devolver aquí el nombre del video asignado
});


api.post('/transcrip/speechtext/url', async (req, res) => {
  console.log("ESTO ES URL");
  uniqueId = uuidv4();
  console.log(req.body);
  const streamingurl = req.body.videoUrlstate;
  console.log(`El identificador unico es: ${uniqueId}`);
  const resultRequest = await TranscriptionController.request_transcription_url(streamingurl, uniqueId, req.body.language);
  TranscriptionController.writeFile(resultRequest);
  const start = streamingurl.indexOf('/d/') + 3;
  const end = streamingurl.indexOf('/', start);
  const id = streamingurl.substring(start, end);
  const newurl = `https://drive.google.com/uc?id=${id}&export=download`
  const response = {
    uniqueId: uniqueId,
    newURL: newurl,
    taskID: resultRequest.taskID
  };

  //res.status(200).send(uniqueId);
  res.status(200).json(response);
  
  //Devolver aquí el nombre del video asignado
});

api.get('/transcrip/speechtext/status/:id', async (req, res) => {
  const{id} = req.params;
  console.log("ASDASDPERRITO");
  if(await TranscriptionController.checkFinishedTranscription(id)){
    res.status(200).send();
  }
});

module.exports = api;