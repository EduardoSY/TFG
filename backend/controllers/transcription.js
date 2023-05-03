const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");

const upload = multer();

async function get_result_transcription(config){
  const endpoint = "https://api.speechtext.ai/results?";
  let resultado = undefined;
  while (true) {
  const response = await axios.get(endpoint + new URLSearchParams(config));
  const results = await response
  if (!results.hasOwnProperty("status")) {
    console.log("ROTO en 1");
    break;
  }
  //console.log(results);
  console.log(`Task status: ${results.data.status}`);
  if (results.data.status === "failed") {
  console.log("FALLO");
  //resultado = results;
  break;
  }
  if (results.data.status === "finished") {
  console.log("TERMINADO")
  //resultado = results;
    break;
  }
  await new Promise(resolve => setTimeout(resolve, 15000));
  }
  

  const response_config_srt = {
    "key": "4374fd964d4a4a4a9fb30b388947f162",
    "task": config.task,
    "output": "srt",
    "max_caption_words": 15
  }


  console.log("OBTENER LA INFORMACION DE LA TRANSCRIPCION");
  const url_final = endpoint + new URLSearchParams(response_config_srt);
  console.log("URL = " + url_final)
  const response_srt = await axios.get(url_final);
  const results_srt = await response_srt

  resultado = JSON.stringify(results_srt.data);

  console.log("-----------------------------------------------");
  console.log(JSON.stringify(results_srt.data));
  console.log("VERGAZO");


  //MODIFICAR PARA QUE CUMPLA PRINCIPIO SOLID
  return resultado;
}

async function request_transcription(video_path){
    console.log("Se ha llamado a la funcion");
    console.log(video_path)
    const video = fs.readFileSync(video_path, (err, data) => {
        if (err) {
          //console.error(err);
          return;
        }
        //console.log(data);
      });

      const response = await axios.post('https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162&language=es-ES', video, {
             headers: {
               'Content-Type': 'application/octet-stream'
             }
         });

         console.log(response.data);

    const response_config = {
      "task": response.data.id,
      "key": "4374fd964d4a4a4a9fb30b388947f162",
      //"output": "srt",
      "max_caption_words": 15
    };

    //console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-");
    //console.log(response_config);

    console.log("Transcipcion INICIADA");
    const resultado_final = await get_result_transcription(response_config);
    const resultado_formateado  = JSON.parse(resultado_final);
    //console.log("___________________________________");
    //console.log(resultado_final);

    //const nombre_fichero_base = path.basename(video_path);
    //const ruta_ficheros = "../uploads/";

    //const stringformateado = resultado_final.replace(/\n/g, "\r\n");
    
    
    fs.writeFileSync( video_path + ".srt", resultado_formateado);

    // const formData = new FormData();
    // formData.append('post-body', video);
    // const response = await axios.post('https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162', formData, {
    //     headers: {
    //       'Content-Type': 'application/octet-stream'
    //     }
    // });
    
    //return response.data;

    

    //res.status(200).send({msg: "LLAMADA"});
}

module.exports = {
    request_transcription,
};