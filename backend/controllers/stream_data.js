const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");
const { UPLOADS_PATH } = require("../constants");

const mime = require('mime-types');
const upload = multer();

//ESTO NO CUMPLE PRINCIPIO SOLID PERO BUENO, HAY QUE MODIFICARLO
async function get_result_transcription(config){

}

async function request_transcription(video_path, token){

}

//Funcion para obtener desde google drive
function streamData(req, res){
        const { id } = req.params;
        //const pathito = "../uploads"
        const filePath = path.join(__dirname, '../uploads', id);
        console.log(filePath);
      
        // Comprueba si el archivo existe
        if (!fs.existsSync(filePath)) {
          res.status(404).send('Video no encontrado');
          return;
        }
      
        // Configura el encabezado de respuesta para el tipo de contenido del video
        const mimeType = mime.lookup(filePath);
        res.setHeader('Content-Type', mimeType);
      
        // Transfiere el archivo de video al cliente
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
  
}

module.exports = {
    streamData
};