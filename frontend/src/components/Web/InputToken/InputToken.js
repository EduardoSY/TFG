import React, { useState, useEffect } from "react";
import { Button, Input, Icon, Form, Radio } from "semantic-ui-react";
import { ENV } from "../../../utils";

import { Subtitles } from "../../../api/subtitles";
import { manageData } from "../../../api/manageData";
import { isValidUUID } from "../../../utils/checkFunctions";
import "./InputToken.scss";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const subtitlesController = new Subtitles();
const manageDataController = new manageData();

export function InputToken({ setVideoUrl, setShouldRefreshSubtitles }) {
  const [token, setToken] = useState("");
  const [selectedOption, setSelectedOption] = useState("token");
  const [driveURL, setDriveURL] = useState("");

  const handleOptionChange = (event, { value }) => {
    setSelectedOption(value);
  };

  const handleDriveURL = () =>{
    const start = driveURL.indexOf('/d/') + 3;
    const end = driveURL.indexOf('/', start);
    const id = driveURL.substring(start, end);
    const newurl = `https://drive.google.com/uc?id=${id}&export=download`
    setVideoUrl(newurl);
    console.log(driveURL);
  }

  const handleGetData = () => {
    // Lógica para recuperar los datos del backend utilizando el token
    if (token !== "" && isValidUUID(token)) {
      console.log("Recuperando datos del backend");
      console.log("Token:", token);
      subtitlesController.setAccessToken(token);
      const new_video_path =
        ENV.BASE_API + "/" + ENV.API_ROUTES.STREAM_DATA + "/" + token + ".mp4";
      setVideoUrl(new_video_path);
      console.log("NUEVA URL");
      console.log(new_video_path);
      setShouldRefreshSubtitles(true);
    } else {
      notify_notoken();
    }
  };

  const handleDeleteData = async () => {
    // Lógica para borrar los datos del backend utilizando el token
    console.log("Borrando datos del backend");
    console.log("Token:", token);
    if (token !== "" && isValidUUID(token)) {
      const response = await manageDataController.deleteData(token);
      notify(response);
      sessionStorage.removeItem("token");
    } else {
      notify_notoken();
    }
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const notify = (response) => {
    if (response.contador !== 0) {
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
      toast.warning(
        "Qué extraño. Parece que no había ningún elemento con ese identificador para borrar... ",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const notify_notoken = () => {
    toast.error("Por favor, introduce un token válido.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="inputtoken">
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
      <br/>
    </div>
  );
}
