import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Dropdown, Button, Message, Popup} from "semantic-ui-react";
import { Subtitles } from "../../../api/subtitles";
import { ENV } from "../../../utils";
import { Translation } from "../../../api/translation";
import "./FormularioModal.scss";

const subtitlesController = new Subtitles();

export function FormularioModal({ setVideoUrl, setShouldRefreshSubtitles }) {
  const options = [
    { key: "es", text: "Español", value: "Español" },
    { key: "en", text: "Inglés", value: "Inglés" },
    { key: "fr", text: "Frances", value: "Frances" },
  ];

  const [file, setFile] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [showState, setShowState] = useState("");
  const [submitState, setSubmitState] = useState("");
  

  const [availableLanguages, setAvailableLanguages] = useState();

  const translationController = new Translation();

  const handleChange = (event) => {
    setSubmitState("");
    const selectedFile = event.target.files[0];
    const maxSize = 10485760; // Tamaño máximo permitido en bytes (1 MB)

    if (selectedFile && selectedFile.size > maxSize) {
      // Mostrar alerta de error
      //alert("El archivo seleccionado es demasiado grande. Por favor, elige un archivo más pequeño.");
      // Reiniciar el valor del campo de entrada de archivos
      //setErrorState(true);
      setShowState("error");
      event.target.value = null;
    } else {
      setFile(event.target.files[0]);
      //setErrorState(false);
      setShowState("success");
    }
  };

  useEffect(() => {
    if (!availableLanguages) {
      translationController
        .getTranslationLanguages()
        .then((response) => {
          setAvailableLanguages(response);
          console.log(response);
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const modifiedObj = [];

  for (let key in availableLanguages) {
    const item = availableLanguages[key];
    const modifiedItem = {
      key: item.language,
      text: item.name,
      value: item.language,
    };
    modifiedObj.push(modifiedItem);
  }

  const handleSubmit = async (event) => {
    if(!file){
      setSubmitState("error");
    }
    event.preventDefault();
    const formData = new FormData();
    formData.append("video", file);
    console.log("FILE SIZE");
    console.log(file.size);
    setSubmitState("sucess");

    //AQUI

    const response = await axios.post(
      ENV.BASE_API + "/" + ENV.API_ROUTES.TRANSCRIPTION,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("APERRO SANCHEZ");
    console.log(response.data);
    subtitlesController.setAccessToken(response.data.uniqueId);

    console.log("FORM MODAL DATA REPSONSE");
    console.log(response.data.uniqueId);
    //const new_video_path = "http://127.0.0.1:8887/" + response.data.uniqueId +"."+response.data.extension ;
    //const new_video_path = "http://localhost:3977/api/v1/stream/video/" + response.data.uniqueId +"."+response.data.extension ;
    const new_video_path =
      ENV.BASE_API +
      "/" +
      ENV.API_ROUTES.STREAM_DATA +
      "/" +
      response.data.uniqueId +
      "." +
      response.data.extension;

    setVideoUrl(new_video_path);
    console.log("NUEVA URL");
    console.log(new_video_path);
    setShouldRefreshSubtitles(true);

    //HASTA AQUI
  };
  return (
    <Form
      error={showState === "error"}
      success={showState === "success"}
      warning
    >
            
      <Form.Input
        required
        label=" Seleccionar fichero (MAX. 50MB.)"
        name="file"
        type="file"
        placeholder="Fichero"
        accept="video/mp4"
        error={showState === "error" || submitState === "error"}
        success={showState === "success"}
        onChange={handleChange}
      />
      <Message
        error
        header="Fichero demasiado grande"
        content="Debido a las limitaciones técnicas del proyecto no aceptamos ficheros con un tamaño superior a 50 MB. Prueba con un fichero más pequeño."
      />

      <Message success header="Fichero válido" />
      <Form.Field>
        <label>Idioma (opcional)</label>
        <Dropdown
          placeholder="Selecciona el idioma del video"
          fluid
          selection
          options={modifiedObj}
        />
        <Message
          warning
          content="Recomendamos seleccionar un idioma. La selección de este hará que la 
          traducción sea más precisa y fiable. Sin embargo, en caso de no seleccionarlo 
          el sistema tratará de detectar el idioma de manera automática."
        />
      </Form.Field>
      <Button className="button-submit-modal" fluid type="submit" onClick={handleSubmit}>
        ENVIAR
      </Button>
      {submitState === "error" && (
        <Message negative
        header="Revisa los campos del formulario"
        />
)}

{submitState === "sucess" && (
        <Message positive
        header="Solicitud enviada" 
        content="Ahora podrás reproducir tu video en el reproductor mientras esperas a que se genera la transcripción. Este proceso puede tardar varios minutos."
        />
)}


      

    </Form>
  );
}
