//const SERVER_IP = "localhost:3977";
const SERVER_IP = "backendtfg-4jyo.onrender.com";

const API_VERSION = "v1";
export const ENV = {
  BASE_PATH: `https://${SERVER_IP}`,
  BASE_API: `https://${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    SUBTITLES: "vttfiles",
    TRANLATION_OPTIONS: "traslate/available_languages",
    REQUEST_TRANSLATION: "traslate/request_translation",
    CHECK_TRANSCRIPTION: "transcrip/speechtext/status",
    DOWNLOAD_VTT: "vttfiles/download",
    STREAM_DATA: "stream",
    TRANSCRIPTION: "transcrip/speechtext",
  }
}

export const languages = [
  {
      "language": "BG",
      "name": "Bulgarian"
  },
  {
      "language": "CS",
      "name": "Czech"
  },
  {
      "language": "DA",
      "name": "Danish"
  },
  {
      "language": "DE",
      "name": "German"
  },
  {
      "language": "EL",
      "name": "Greek"
  },
  {
      "language": "EN-GB",
      "name": "English (British)"
  },
  {
      "language": "EN-US",
      "name": "English (American)"
  },
  {
      "language": "ES",
      "name": "Spanish"
  },
  {
      "language": "ET",
      "name": "Estonian"
  },
  {
      "language": "FI",
      "name": "Finnish"
  },
  {
      "language": "FR",
      "name": "French"
  },
  {
      "language": "HU",
      "name": "Hungarian"
  },
  {
      "language": "ID",
      "name": "Indonesian"
  },
  {
      "language": "IT",
      "name": "Italian"
  },
  {
      "language": "JA",
      "name": "Japanese"
  },
  {
      "language": "KO",
      "name": "Korean"
  },
  {
      "language": "LT",
      "name": "Lithuanian"
  },
  {
      "language": "LV",
      "name": "Latvian"
  },
  {
      "language": "NB",
      "name": "Norwegian"
  },
  {
      "language": "NL",
      "name": "Dutch"
  },
  {
      "language": "PL",
      "name": "Polish"
  },
  {
      "language": "PT-BR",
      "name": "Portuguese (Brazilian)"
  },
  {
      "language": "PT-PT",
      "name": "Portuguese (European)"
  },
  {
      "language": "RO",
      "name": "Romanian"
  },
  {
      "language": "RU",
      "name": "Russian"
  },
  {
      "language": "SK",
      "name": "Slovak"
  },
  {
      "language": "SL",
      "name": "Slovenian"
  },
  {
      "language": "SV",
      "name": "Swedish"
  },
  {
      "language": "TR",
      "name": "Turkish"
  },
  {
      "language": "UK",
      "name": "Ukrainian"
  },
  {
      "language": "ZH",
      "name": "Chinese (simplified)"
  }
];

export const supportedSpeechTextLanguages = [
    {
        "key": "en-US",
        "text": "English",
        "value": "en-US"
      },
      {
        "key": "zh-CN",
        "text": "Chinese",
        "value": "zh-CN"
      },
      {
        "key": "ja-JP",
        "text": "Japanese",
        "value": "ja-JP"
      },
      {
        "key": "de-DE",
        "text": "German",
        "value": "de-DE"
      },
      {
        "key": "es-ES",
        "text": "Spanish",
        "value": "es-ES"
      },
      {
        "key": "it-IT",
        "text": "Italian",
        "value": "it-IT"
      },
      {
        "key": "ar-AE",
        "text": "Arabic",
        "value": "ar-AE"
      },
      {
        "key": "fr-FR",
        "text": "French",
        "value": "fr-FR"
      },
      {
        "key": "nl-NL",
        "text": "Dutch",
        "value": "nl-NL"
      },
      {
        "key": "pt-PT",
        "text": "Portuguese",
        "value": "pt-PT"
      },
      {
        "key": "hi-IN",
        "text": "Hindi",
        "value": "hi-IN"
      },
      {
        "key": "fa-IR",
        "text": "Persian",
        "value": "fa-IR"
      },
      {
        "key": "ru-RU",
        "text": "Russian",
        "value": "ru-RU"
      },
      {
        "key": "uk-UA",
        "text": "Ukrainian",
        "value": "uk-UA"
      },
      {
        "key": "fil-PH",
        "text": "Filipino",
        "value": "fil-PH"
      },
      {
        "key": "el-GR",
        "text": "Greek",
        "value": "el-GR"
      }
  ];
  