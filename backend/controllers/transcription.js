const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");
const { UPLOADS_PATH } = require("../constants");

const upload = multer();

async function get_result_transcription(config) {
  const endpoint = "https://api.speechtext.ai/results?";
  let resultado = undefined;
  while (true) {
    const response = await axios.get(endpoint + new URLSearchParams(config));
    const results = await response;
    if (!results.hasOwnProperty("status")) {
      break;
    }
    console.log(`Task status: ${results.data.status}`);
    if (results.data.status === "failed") {
      //resultado = results;
      break;
    }
    if (results.data.status === "finished") {
      //resultado = results;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  const response_config_srt = {
    key: "4374fd964d4a4a4a9fb30b388947f162",
    task: config.task,
    output: "vtt",
    max_caption_words: 15,
  };

  console.log("OBTENER LA INFORMACION DE LA TRANSCRIPCION");
  const url_final = endpoint + new URLSearchParams(response_config_srt);
  console.log("URL = " + url_final);
  const response_srt = await axios.get(url_final);
  const results_srt = await response_srt;

  resultado = JSON.stringify(results_srt.data);

  console.log("-----------------------------------------------");
  console.log(JSON.stringify(results_srt.data));

  return resultado;
}

async function request_transcription(video_path, token, language) {
  console.log("Se ha llamado a la funcion");
  console.log(video_path);
  //console.log(path.join(path.dirname(video_path), path.basename(video_path, path.extname(video_path)) + '.vtt'););
  const newFilePath = path.join(
    path.dirname(video_path),
    path.basename(video_path, path.extname(video_path)) +
      `_original-${language}.vtt`
  );
  console.log(newFilePath);
  let languageOption = "";
  if (language !== "") {
    languageOption = `&language=${language}`;
  }
  const url = `https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162${languageOption}`;
  console.log(url);

  //DESDE AQUI
  const video = fs.readFileSync(video_path, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const response = async () => {
    const respon = await axios.post(url, video, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    console.log(`Transcipcion INICIADA con ID: ${respon.data.id}`);
    const jsonData = {
      taskID: respon.data.id,
      pathFile: newFilePath,
    };

    return jsonData;
  };

  const respondida = await response();

  return respondida;
}

async function writeFile(data) {
  console.log("LLAMADO WRITEFILE");
  console.log(data);
  const { taskID, pathFile } = data;
  console.log(`${taskID} ---- ${pathFile}`);
  const response_config = {
    task: taskID,
    key: "4374fd964d4a4a4a9fb30b388947f162",
    max_caption_words: 15,
  };

  console.log("Transcipcion INICIADA");
  const resultado_final = await get_result_transcription(response_config);
  const resultado_formateado = JSON.parse(resultado_final);

  fs.writeFileSync(pathFile, resultado_formateado);
}

async function checkFinishedTranscription(taskID) {
  const response_config = {
    task: taskID,
    key: "4374fd964d4a4a4a9fb30b388947f162",
  };

  const endpoint = "https://api.speechtext.ai/results?";
  let results;
  while (true) {
    const response = await axios.get(
      endpoint + new URLSearchParams(response_config)
    );
    results = await response;
    if (!results.hasOwnProperty("status")) {
      break;
    }
    console.log(`Task status: ${results.data.status}`);
    if (results.data.status === "failed") {
      //resultado = results;
      break;
    }
    if (results.data.status === "finished") {
      return true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }
}
//Funcion para obtener desde google drive
async function request_transcription_url(video_path, token, language) {
  console.log("Se ha llamado a la funcion google drive");
  console.log(video_path);
  const newFilePath = path.join(
    UPLOADS_PATH,
    token + `_original-${language}.vtt`
  );
  console.log(newFilePath);

  let languageOption = "";
  if (language !== "") {
    languageOption = `&language=${language}`;
  }

  const response_async = async () => {
    const response = await axios.get(
      `https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162&url=${video_path}${languageOption}`
    );
    console.log(`Transcipcion INICIADA con ID: ${response.data.id}`);
    const jsonData = {
      taskID: response.data.id,
      pathFile: newFilePath,
    };

    return jsonData;
  };

  const respondida = await response_async();

  return respondida;
}

module.exports = {
  request_transcription,
  request_transcription_url,
  writeFile,
  checkFinishedTranscription,
};
