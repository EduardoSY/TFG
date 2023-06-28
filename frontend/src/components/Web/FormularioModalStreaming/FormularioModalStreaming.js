import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Dropdown,
  Button,
  Message,
  Image,
  Checkbox,
} from "semantic-ui-react";
import { Subtitles } from "../../../api/subtitles";
import { Translation } from "../../../api/translation";
import { isGoogleDriveUrl } from "../../../utils/checkFunctions";
import { InfoIconPopUp } from "../InfoIconPopUp";

const subtitlesController = new Subtitles();
const translationController = new Translation();

export function FormularioModalStreaming({ setVideoUrl }) {
  const [videoUrlstate, setVideoUrlstate] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");
  const [submitState, setSubmitState] = useState("");

  const [URL, setURL] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState();

  const handleInputChange = (event) => {
    setSubmitState("");
    const url = event.target.value;
    if (isGoogleDriveUrl(url)) {
      console.log("ESTA URL SI ES DE GOOGLE DRIVE");
      setCheckStatus("success");
      setVideoUrlstate(event.target.value);
    } else {
      console.log("ESTA URL NO ES DE GOOGLE DRIVE");
      setCheckStatus("error");
      setVideoUrlstate(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoUrlstate) {
      setSubmitState("error");
    } else {
      setSubmitState("sucess");

      //DE AQUI

      const response = await axios.post(
        "http://localhost:3977/api/v1/transcrip/speechtext/url",
        { videoUrlstate }
      );
      subtitlesController.setAccessToken(response.data.uniqueId);
      console.log(response.data);
      setVideoUrl(response.data.newURL);

      //HASTA AQUI
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
  return (
    <Form
      error={checkStatus === "error"}
      success={checkStatus === "success"}
      warning
    >
      <Form.Field
        required
        error={checkStatus === "error" || submitState === "error"}
      >
        <label>
          URL del video{" "}
          <InfoIconPopUp
            imagePath="../../../assets/acceso_drive.jpg"
            altText="Descripción de la imagen"
          />
        </label>

        <input
          placeholder="URL"
          value={videoUrlstate}
          onChange={handleInputChange}
        />
      </Form.Field>
      <Message
        error
        header="URL no válida"
        content="Recuerda que debe ser un video alojado en Google Drive y 
        con acceso público. Pasa por encima del icóno de información y 
        obtendrás una visualización de la configuración."
      />

      <Message success header="La URL parece válida" />
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
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {submitState === "error" && (
        <Message negative header="Revisa los campos del formulario" />
      )}

      {submitState === "sucess" && (
        <Message
          positive
          header="Solicitud enviada"
          content="Ahora podrás reproducir tu video en el reproductor mientras esperas a que se genera la transcripción. Este proceso puede tardar varios minutos."
        />
      )}
    </Form>
  );
}
