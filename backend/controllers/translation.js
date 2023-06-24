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
    //const token = "8bd2c4e2-f12e-4d08-9e2f-7175892787c7"
    console.log(token);
    console.log(selectedLanguage);

    const vttFile = UPLOADS_PATH + `/${token}_original.vtt`;
    console.log(vttFile);
    const vttContent = fs.readFileSync(vttFile, 'utf8');
    console.log(vttContent)
    const translationResult = await translator.translateText(vttContent, null, selectedLanguage);
    console.log(translationResult.text); // 'Bonjour, le monde !'

    const translatedText = translationResult.text; // Texto traducido

// Ruta y nombre del archivo de salida
const translatedVttFile = UPLOADS_PATH + `/${token}_${selectedLanguage}.vtt`;

fs.writeFile(translatedVttFile, translatedText, 'utf8', (err) => {
  if (err) {
    console.error('Error al guardar el archivo traducido:', err);
    res.status(400).send({msg: `Error al guardar el archivo traducido`});
    return;
  }

  console.log('Archivo traducido guardado exitosamente:', translatedVttFile);
  res.status(200);
});
    
}

module.exports = {
    getTranslationLanguages,
    requestTranslation
  };