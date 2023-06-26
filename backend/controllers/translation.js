const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const { url } = require("inspector");
const { resourceLimits } = require("worker_threads");
const { DEEPL_APIKEY, UPLOADS_PATH } = require("../constants");

const deepl = require("deepl-node");
const translator = new deepl.Translator(DEEPL_APIKEY);

async function getTranslationLanguages(req, res) {
  const response = await axios.get(
    "https://api-free.deepl.com/v2/languages?type=target",
    {
      headers: {
        Authorization: "DeepL-Auth-Key b9735e22-0655-c703-e64b-62c08bfbe09f:fx",
      },
    }
  );
  const resultado = JSON.stringify(response.data);

  if (!response) {
    res.status(400).send({ msg: `Error al recibir de la API de DEEPL` });
  } else {
    res.status(200).send(JSON.stringify(response.data));
  }
}

async function requestTranslation(req, res) {
  const { token, selectedLanguage } = req.body;

  //const vttFile = UPLOADS_PATH + `/${token}_original.vtt`;
  const vttFile = path.join(__dirname, "../uploads", `${token}_original.vtt`);

  const vttContent = fs.readFileSync(vttFile, "utf8");

  const translationResult = await translator.translateText(
    vttContent,
    null,
    selectedLanguage
  );

  const translatedText = translationResult.text;

  // Ruta y nombre del archivo de salida
  //const translatedVttFile = UPLOADS_PATH + `/${token}_${selectedLanguage}.vtt`;
  const translatedVttFile = path.join(
    __dirname,
    "../uploads",
    `${token}_${selectedLanguage}.vtt`
  );

  fs.writeFile(translatedVttFile, translatedText, "utf8", (err) => {
    if (err) {
      console.error("Error al guardar el archivo traducido:", err);
      res.status(400).send({ msg: `Error al guardar el archivo traducido` });
      return;
    }

    console.log("Archivo traducido guardado exitosamente:", translatedVttFile);
    res.status(200);
  });
}

module.exports = {
  getTranslationLanguages,
  requestTranslation,
};
