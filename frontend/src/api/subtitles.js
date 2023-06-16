import { ENV } from "../utils";

export class Subtitles {
    baseApi = ENV.BASE_API;

    async getSubtitles(id_subtitles) {
        console.log("FUNCION LLAMADA");
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.SUBTITLES}`;
          const params = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: id_subtitles}) // Aquí se incluye el ID en el cuerpo de la solicitud
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }
    
}