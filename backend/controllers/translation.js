const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");

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
    const vttpath = `original-`
    const vttContent = fs.readFileSync('ruta/al/archivo.vtt', 'utf-8');
  //console.log(req.body);
  const { token, selectedLanguage} = req.body;
  console.log(selectedLanguage);
}

module.exports = {
    getTranslationLanguages,
    requestTranslation
  };