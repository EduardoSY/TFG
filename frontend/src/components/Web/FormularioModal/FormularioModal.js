import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Dropdown, Button } from "semantic-ui-react";
import { Subtitles } from "../../../api/subtitles";
import { ENV } from "../../../utils";
import { Translation } from "../../../api/translation";

const subtitlesController = new Subtitles();

export function FormularioModal({ setVideoUrl, setShouldRefreshSubtitles }) {
  const options = [
    { key: "es", text: "Español", value: "Español" },
    { key: "en", text: "Inglés", value: "Inglés" },
    { key: "fr", text: "Frances", value: "Frances" },
  ];

  const [file, setFile] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState("");

  const translationController = new Translation();

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    translationController.getTranslationLanguages()
    .then((response) => {
      setAvailableLanguages(response);
      console.log(response);
      //console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
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
    event.preventDefault();
    const formData = new FormData();
    formData.append("video", file);

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
  };
  return (
    <Form>
      <Form.Input
        name="file"
        type="file"
        placeholder="Fichero"
        accept="video/*"
        onChange={handleChange}
      />
      <Form.Field>
        <label>Idioma</label>
        <Dropdown
          placeholder="Selecciona el idioma del video"
          fluid
          selection
          options={modifiedObj}
        />
      </Form.Field>
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
