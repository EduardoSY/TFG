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

function deleteData(req, res){
  const { id } = req.params;
  console.log(id);
  const folderPath = path.join(__dirname, '../uploads');
  let contador = 0;

  const patron = new RegExp(`^${id}*`);

  fs.readdir(folderPath, (error, archivos) => {
    if (error) {
      console.error('Error al leer el directorio:', error);
      return;
    }
  
    archivos.forEach((archivo) => {
      console.log(archivo);
      if (archivo.startsWith(id)) {
        const rutaArchivo = path.join(folderPath, archivo);
        contador = contador + 1;
        //  fs.unlink(rutaArchivo, (error) => {
        //   if (error) {
        //      console.error('Error al eliminar el archivo:', error);
        //    } else {
        //      console.log(`Archivo eliminado: ${rutaArchivo}`);
        //    }
        //  });
      }
    });
    res.status(200).json({contador: contador});
    console.log(`Se eliminarian ${contador} archivos`);
  });
  
  
 
}

module.exports = {
    streamData,
    deleteData
};