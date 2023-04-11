const axios = require("axios");
const multer = require("multer");
const fs = require("fs");

const upload = multer();

async function request_transcription(video_path){
    console.log("Se ha llamado a la funcion");
    console.log(video_path)
    const video = fs.readFileSync(video_path, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });

      const response = await axios.post('https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162&language=es-ES', video, {
             headers: {
               'Content-Type': 'application/octet-stream'
             }
         });

         console.log(response);
    // const formData = new FormData();
    // formData.append('post-body', video);
    // const response = await axios.post('https://api.speechtext.ai/recognize?key=4374fd964d4a4a4a9fb30b388947f162', formData, {
    //     headers: {
    //       'Content-Type': 'application/octet-stream'
    //     }
    // });
    
    //return response.data;

    

    //res.status(200).send({msg: "LLAMADA"});
}

module.exports = {
    request_transcription,
};