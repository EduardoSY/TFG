import { ENV } from "../utils";

export class Subtitles {
    baseApi = ENV.BASE_API;

    async getSubtitles(id_subtitles) {
        
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.SUBTITLES}/${id_subtitles}`;
          
          const params = {
            method: "GET",
            headers: {
              'Content-Type':'application/json',
            },
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }

      setAccessToken(token) {
        sessionStorage.setItem("token", token);
      }
    
}