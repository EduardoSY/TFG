const express = require("express");
const api = express.Router();

const TranslationController = require("../controllers/translation");
api.get(
  "/traslate/available_languages",
  TranslationController.getTranslationLanguages
);
api.post(
  "/traslate/request_translation",
  TranslationController.requestTranslation
);

module.exports = api;
