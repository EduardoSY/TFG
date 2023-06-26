const SERVER_IP = "localhost:3977";

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