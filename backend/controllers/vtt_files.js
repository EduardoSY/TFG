const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");

async function get_transcription_files (req, res) {
    //const transcriptionId = req.params.id;
    const {id} = req.params;
    const transcriptionId = id;
    // Directorio donde se almacenan los archivos de transcripción
    //const directoryPath = path.join(__dirname, 'uploads', transcriptionId);
    const directoryPath = "C://Users//EduardoSY//Desktop//TFG//Desarrollo_TFG//MiTFG//TFG//uploads";
    console.log(directoryPath);
    let debug_count = 0;
  
    // Verifica si el directorio existe
    if (fs.existsSync(directoryPath)) {
      // Lee los archivos en el directorio 
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          res.status(500).json({ error: 'Error al leer los archivos de transcripción' });
          console.log("marico");
        } else {
          // Crea un arreglo para almacenar la información de cada archivo
          const fileData = [];
  
          // Itera sobre los archivos y obtén la información relevante
          files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const fileStats = fs.statSync(filePath);
  
            if (file.includes(transcriptionId) && file.endsWith('.vtt')){
                fileData.push({
                    filename: file,
                    size: fileStats.size,
                    lastModified: fileStats.mtime,
                  });
                 debug_count = debug_count + 1;
            }


            // Agrega la información del archivo al arreglo
           
          });
  
          // Devuelve la información de los archivos como respuesta
          res.json({ files: fileData });
          console.log(debug_count);
        }
      });
    } else {
      // El directorio no existe, devuelve un error 404
      res.status(404).json({ error: 'Transcripción no encontrada' });
      console.log("asd"); 
    }
  };


async function getVTTFiles(req, res) {
    //const { active } = req.query;
    let id = req.id;
    response = get_transcription_files(id);
    //let response = null;
    //res.status(200).send(response);

    if(!response) {
        res.status(400).send({msg: `No se ha encontrado asdasd`});
      } else{
        console.log(response);
        res.status(200).send(response)
      }
  }

module.exports = {
    get_transcription_files,
};