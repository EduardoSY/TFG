const express = require("express");
const axios = require("axios");
const TranscriptionController = require("../controllers/transcription.js");
const path = require("path");
const api = express.Router();
const https = require("https");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cheerio = require("cheerio");

//api.post("/transcrip/speechtext", TranscriptionController.request_transcription);

const multer = require("multer");
//const upload = multer();
let uniqueId = null;
// SET STORAGE
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    uniqueId = uuidv4();
    cb(null, uniqueId + ".mp4");
  },
});
var upload = multer({ storage: storage });

api.post("/transcrip/speechtext", upload.single("video"), async (req, res) => {
  const video = req.file;
  //console.log(req);
  //const uniqueId = uuidv4();
  //console.log(video);
  console.log(`El identificador unico es: ${uniqueId}`);
  //console.log(req.file.path);
  //const basename = path.basename(`${uniqueId}.mp4`.replace(/\\/g, "/"));
  const resultRequest = await TranscriptionController.request_transcription(
    req.file.path,
    uniqueId,
    req.body.language
  );
  console.log("AAAA QUIERO MORIR");
  console.log(resultRequest);
  TranscriptionController.writeFile(resultRequest);
  // Aquí puedes procesar el archivo de video recibido
  const response = {
    uniqueId: uniqueId,
    extension: req.file.path.split(".").pop(),
    taskID: resultRequest.taskID,
  };
  //res.status(200).send(uniqueId);
  res.status(200).json(response);

  //Devolver aquí el nombre del video asignado
});

async function downloadAndTranscribe(newurl, newFilePath, uniqueId, language) {
  console.log("DESCARGA Y TRANSCRIPCION");
  try {
    const response = await axios.get(newurl, { responseType: "stream" });
    const tipo_respuesta = response.headers["content-type"];

    if (tipo_respuesta === "video/mp4") {
      console.log("DESCARGA SIN FORMULARIO");
      //const fileResponse = await axios.get(newurl, { responseType: "stream" });
      const fileStream = fs.createWriteStream(newFilePath);

      response.data.pipe(fileStream);

      await new Promise((resolve, reject) => {
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", (error) => {
          reject(error);
        });
      });

      console.log("Archivo descargado correctamente sin formulario.");
    } else if (tipo_respuesta === "text/html; charset=utf-8") {
      console.log("AQUI SALTARIA EL HTML");
    }
    //const html = response.data;
    //const $ = cheerio.load(html);
    //const downloadForm = $('#download-form');

    // if (downloadForm.length > 0) {
    //   console.log("DESCARGA CON FORMULARIO");
    //   const downloadUrl = downloadForm.attr('action');
    //   const downloadResponse = await axios.get(downloadUrl, { responseType: 'stream' });

    //   const file = fs.createWriteStream(newFilePath);
    //   downloadResponse.data.pipe(file);

    //   await new Promise((resolve, reject) => {
    //     file.on('finish', () => {
    //       file.close();
    //       resolve();
    //     });

    //     file.on('error', (error) => {
    //       reject(error);
    //     });
    //   });

    //   console.log('Archivo descargado correctamente.');
    // } else {
    //   // Descarga directa sin formulario de descarga
    //   console.log("DESCARGA SIN FORMULARIO");
    //   const fileResponse = await axios.get(newurl, { responseType: 'stream' });
    //   const fileStream = fs.createWriteStream(newFilePath);

    //   fileResponse.data.pipe(fileStream);

    //   await new Promise((resolve, reject) => {
    //     fileStream.on('finish', () => {
    //       fileStream.close();
    //       resolve();
    //     });

    //     fileStream.on('error', (error) => {
    //       reject(error);
    //     });
    //   });

    //   console.log('Archivo descargado correctamente sin formulario.');
    // }

    // const resultRequest = await TranscriptionController.request_transcription(
    //   newFilePath,
    //   uniqueId,
    //   language
    // );

    // console.log('Transcripción realizada correctamente.');
    // console.log(resultRequest);

    // TranscriptionController.writeFile(resultRequest);

    // const response2 = {
    //   uniqueId: uniqueId,
    //   extension: newFilePath.split('.').pop(),
    //   taskID: resultRequest.taskID,
    // };

    // return response2;
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    throw error;
  }
}

api.post("/transcrip/speechtext/url", async (req, res) => {
  console.log("ESTO ES URL");
  uniqueId = uuidv4();
  console.log(req.body);
  const streamingurl = req.body.videoUrlstate;
  console.log(`El identificador unico es: ${uniqueId}`);
  let newFilePath = path.join(__dirname, "../uploads", uniqueId);
  newFilePath = newFilePath + ".mp4";

  try {
    const start = streamingurl.indexOf("/d/") + 3;
    const end = streamingurl.indexOf("/", start);
    const id = streamingurl.substring(start, end);
    const newurl = `https://drive.google.com/uc?id=${id}&export=download`;

    const response = await downloadAndTranscribe(
      newurl,
      newFilePath,
      uniqueId,
      req.body.language
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en la transcripción:", error);
    res.status(500).send("Error en la transcripción.");
  }
});

api.get("/transcrip/speechtext/status/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ASDASDPERRITO");
  if (await TranscriptionController.checkFinishedTranscription(id)) {
    res.status(200).send();
  }
});

module.exports = api;
