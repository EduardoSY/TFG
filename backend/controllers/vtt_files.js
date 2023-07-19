const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");
const { UPLOADS_PATH, GENERAL_PATH } = require("../constants");
const { uptime } = require("process");

/**
 * Obtiene los ficheros de transcripción en funcion al id suministrado
 *
 * @param {number} id - El primer número.
 * @returns {json} La suma de los dos números.
 */
async function get_transcription_files(req, res) {
  const { id } = req.params;
  const transcriptionId = id;
  const directoryPath = path.join(__dirname, "../uploads");
  console.log(directoryPath);
  let debug_count = 0;
  // Verifica si el directorio existe
  if (fs.existsSync(directoryPath)) {
    // Lee los archivos en el directorio
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Error al leer los archivos de transcripción" });
      } else {
        // Crea un array para almacenar la información de cada archivo
        const regex = /_(.*?)\.vtt/;
        const fileData = [];
        // Itera sobre los archivos
        files.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const match = regex.exec(file);

          if (file.includes(transcriptionId) && file.endsWith(".vtt")) {
            fileData.push({
              filename: file,
              filepath: filePath,
              language: match[1],
            });
            debug_count = debug_count + 1;
          }
        });

        // Devuelve la información de los archivos como respuesta
        res.json({ files: fileData });
        console.log(debug_count);
      }
    });
  } else {
    // El directorio no existe, devuelve un error 404
    res.status(404).json({ error: "Transcripción no encontrada" });
  }
}

/**
 * Funcion utilizada en el endpoint
 *
 * @param {number} id
 * @returns {response}
 */
async function getVTTFiles(req, res) {
  let id = req.id;
  response = get_transcription_files(id);

  if (!response) {
    res.status(400).send({ msg: `No se ha encontrado asdasd` });
  } else {
    console.log(response);
    res.status(200).send(response);
  }
}

/**
 * Permite descargar un fichero VTT
 *
 * @param {number} file
 * @returns {file}
 */
function downloadVTTFile(req, res) {
  const { file } = req.params;
  console.log(file);
  const vttFilePath = path.join(__dirname, "../uploads", file);

  res.download(vttFilePath, file, (err) => {
    if (err) {
      // Manejo del error
      console.error(err);
      res.status(500).send("Error al descargar el archivo");
    }
  });
}

module.exports = {
  get_transcription_files,
  downloadVTTFile,
};
