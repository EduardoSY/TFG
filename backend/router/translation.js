const express = require("express");
const api = express.Router();

const TranslationController = require("../controllers/translation");
api.get('/traslate/available_languages',TranslationController.getTranslationLanguages);

module.exports = api;