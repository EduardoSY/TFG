import { ENV } from "../utils";
export class manageData {
    baseApi = ENV.BASE_API;

    async deleteData(id) {
        console.log("FUNCION LLAMADA");
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.STREAM_DATA}/${id}`;
          console.log(url);
          const params = {
            method: "DELETE",
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