const SERVER_IP = "localhost:3977";

const API_VERSION = "v1";
export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    SUBTITLES: "vttfiles",
  }
}