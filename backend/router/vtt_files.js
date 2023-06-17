const express = require("express");
const VTTFilesController = require("../controllers/vtt_files");

const api = express.Router();

// api.get('/vttfiles', (req, res) => {
//     const {id} = req.body;
//     console.log(id);
//     response = VTTFilesController.get_transcription_files(id);
//     //let response = null;
//     //res.status(200).send(response);
//     //response = null;
//     if(!response) {
//         res.status(400).send({msg: `No se ha encontrado asdasd`});
//       } else{
//         console.log(response);
//         res.status(200).send(response)
//       }
//   });

api.get('/vttfiles/:id', VTTFilesController.get_transcription_files);

  module.exports = api;