import { ENV } from "../utils";

export class Translation {
    baseAPI = ENV.BASE_API;

    async getTranslationLanguages(){
        try {
            const url = `${this.baseAPI}/${ENV.API_ROUTES.TRANLATION_OPTIONS}`;
            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;
                return result;

        } catch (error) {
            throw error;
        }
    }

    async requestTranslation(data, token){
        try{
            const url = `${this.baseAPI}/${ENV.API_ROUTES.REQUEST_TRANSLATION}`;
            console.log("TRANSCRIPCION PEDIDA");
            //console.log(data);
            const params = {
            method: "POST",
               headers: {
                  "Content-Type": "application/json",
                },
                //body: JSON.stringify(data)
                body: JSON.stringify({
                    token: token,
                    selectedLanguage: data.selectedLanguage
                  }),
              };
              console.log(url);
       
              console.log(params);
              const response = await fetch(url, params);
              const result = await response.json();
       
              if(response.status !== 200) throw result;
                return result


        }catch(error){
        throw error;
     }
    }
}