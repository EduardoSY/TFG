const SERVER_IP = "localhost:3977";
//const SERVER_IP = "exampleback.onrender.com";

const API_VERSION = "v1";
export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    SUBTITLES: "vttfiles",
    TRANLATION_OPTIONS: "traslate/available_languages",
    REQUEST_TRANSLATION: "traslate/request_translation",
    DOWNLOAD_VTT: "vttfiles/download",
    STREAM_DATA: "stream/video",
    TRANSCRIPTION: "transcrip/speechtext"
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