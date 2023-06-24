const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");
const {DEEPL_APIKEY, UPLOADS_PATH} = require("../constants");

const deepl = require('deepl-node');
const translator = new deepl.Translator(DEEPL_APIKEY);


async function getTranslationLanguages (req, res) {
    const response = await axios.get('https://api-free.deepl.com/v2/languages?type=target', {
        headers: {
          'Authorization': 'DeepL-Auth-Key b9735e22-0655-c703-e64b-62c08bfbe09f:fx'
        },
      });
      const resultado = JSON.stringify(response.data);

      if(!response) {
        //resultado = JSON.stringify(response.data);

        //console.log("---######--------------------------------------------");
        //console.log(response.data);
        //console.log(JSON.stringify(response.data));
  
        res.status(400).send({msg: `Error al recibir de la API de DEEPL`});
      } else{
        //console.log(JSON.stringify(response.data));
        res.status(200).send(JSON.stringify(response.data))
      }
};

async function requestTranslation(req, res){
    console.log("HE RECIBIDO UNA REQUEST PARA TRADUCIR");
  const { token, selectedLanguage} = req.body;
    
    const vttFile = UPLOADS_PATH + `/${token}_original.vtt`;
    console.log(vttFile);
    

    const vttContent = fs.readFileSync(vttFile, 'utf8');

    // Eliminar los metadatos del archivo .vtt para obtener solo el texto
    const txtContent = vttContent.replace(/(\d+:\d+:\d+\.\d+ --> \d+:\d+:\d+\.\d+)\s+.*\n/g, '');

    // Guardar el contenido en un archivo .txt
    const txtFilePath = vttFilePath.replace('.vtt', '.txt');
    fs.writeFileSync(txtFilePath, txtContent, 'utf8');

    // Crear instancia de FormData y agregar los campos necesarios
    const formData = new FormData();
    formData.append('target_lang', targetLanguage);
    formData.append('file', fs.createReadStream(txtFilePath));

    // Configurar los encabezados de la solicitud
    formData.append('auth_key', apiKey);
    formData.append('source_lang', sourceLanguage);


    const data = {
      auth_key: DEEPL_APIKEY,
      text: vttContent,
      target_lang: selectedLanguage
    };
  //console.log(req.body);
  console.log(token);
  console.log(selectedLanguage);
}

module.exports = {
    getTranslationLanguages,
    requestTranslation
  };