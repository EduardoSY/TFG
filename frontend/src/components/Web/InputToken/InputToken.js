import React, { useState } from "react";
import { Button, Input, Icon } from "semantic-ui-react";
import { ENV } from "../../../utils";

import { Subtitles } from "../../../api/subtitles";
import { manageData } from "../../../api/manageData";
import "./InputToken.scss";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const subtitlesController = new Subtitles();
const manageDataController = new manageData();

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
    if(token !== null){
      const response = manageDataController.deleteData(token);
      console.log(response);
    }
    //notify_sucess(false);
    
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const notify_sucess = (response) =>{
    if(response){
    toast.success("Datos eliminados con éxito 👋", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("Datos eliminados con éxito 👋", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

  return (
    <div>
      <Input
        type="text"
        placeholder="Ingresa el token"
        action
        className="custom-input"
      >
        <input value={token} onChange={handleTokenChange} />
        <Button
          className="custom-input-button"
          onClick={handleGetData}
          type="submit"
        >
          <Button.Content visible>
            <Icon name="cloud download" /> Recuperar
          </Button.Content>
        </Button>
        {/* <Button className="custom-input-button_delete" onClick={handleDeleteData} type="submit">Delete</Button> */}
        <Button
          animated="fade"
          className="custom-input-button2"
          onClick={handleDeleteData}
          type="submit"
        >
          <Button.Content visible>
            <Icon name="delete" /> Eliminar
          </Button.Content>
          <Button.Content hidden>¿Estas seguro?</Button.Content>
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Input>
    </div>
  );
}
