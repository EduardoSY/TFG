import React, { useState } from "react";
import { Button, Input, Icon } from "semantic-ui-react";
import { ENV } from "../../../utils";

import { Subtitles } from "../../../api/subtitles";
import "./InputToken.scss";

const subtitlesController = new Subtitles();

export function InputToken({ setVideoUrl, setShouldRefreshSubtitles }) {
  const [token, setToken] = useState("");
  const handleGetData = () => {
    // Lógica para recuperar los datos del backend utilizando el token
    console.log("Recuperando datos del backend");
    console.log("Token:", token);
    subtitlesController.setAccessToken(token);
    const new_video_path =
      ENV.BASE_API + "/" + ENV.API_ROUTES.STREAM_DATA + "/" + token + ".mp4";
    setVideoUrl(new_video_path);
    console.log("NUEVA URL");
    console.log(new_video_path);
    setShouldRefreshSubtitles(true);
  };

  const handleDeleteData = () => {
    // Lógica para borrar los datos del backend utilizando el token
    console.log("Borrando datos del backend");
    console.log("Token:", token);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <div>
      <Input type="text" placeholder="Ingresa el token" action className="custom-input">
        <input value={token} onChange={handleTokenChange} />
        <Button
          className="custom-input-button"
          onClick={handleGetData}
          type="submit"
        >
          <Button.Content visible>
            <Icon name="cloud download" /> Buscar
          </Button.Content>
        </Button>
        {/* <Button className="custom-input-button_delete" onClick={handleDeleteData} type="submit">Delete</Button> */}
        <Button
          animated="fade"
          className="custom-input-button_delete"
          onClick={handleDeleteData}
          type="submit"
        >
          <Button.Content visible>
            <Icon name="delete" /> Eliminar
          </Button.Content>
          <Button.Content hidden>¿Estas seguro?</Button.Content>
        </Button>
      </Input>
    </div>
  );
}
