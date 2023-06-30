import React, { useState } from "react";
import {
  Banner,
  VideoJS,
  BasicModal,
  FormularioModal,
  FormularioModalStreaming,
  FormularioTraduccion,
  InputToken,
} from "../../components/Web";
import { ListSubtitles } from "../../components/Web/Subtitles";
import videojs from "video.js";
import { Button, Container, Divider, Message, Input } from "semantic-ui-react";
import "./Home.scss";
import { ENV } from "../../utils";


export function Home() {
  const [showModalLocal, setShowModalLocal] = useState(false);
  const [showModalStream, setShowModalStream] = useState(false);
  const [reload, setReload] = useState(false);
  const [subtitleUrl, setSubtitleUrl] = useState(null);
  const [shouldRefreshSubtitles, setShouldRefreshSubtitles] = useState(false);
  const [allSubtitles, setAllSubtitles] = useState([]);

  const [urlvideo, setURLvideo] = useState(null);

  const [shouldReloadPlayer, setShouldReloadPlayer] = useState(false);

  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "none",
    sources: [
      {
        //src: 'http://127.0.0.1:8887/Muito_ArmaCSGO_Esp.mp4',
        src: "https://drive.google.com/uc?id=12Thpap-SbgbwY1WVOy28AouHzOWOVUtu&export=download",
        type: "video/mp4",
      },
    ],
  });

  const onOpenCloseModalLocal = () =>
    setShowModalLocal((prevState) => !prevState);
  const onOpenCloseModalStream = () =>
    setShowModalStream((prevState) => !prevState);

  const onReload = () => setReload((prevState) => !prevState);

  const playerRef = React.useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    console.log("CARGAMOS LOS SUBTITULOS");
    console.log(allSubtitles);

    allSubtitles.forEach((subtitle) => {
      console.log(subtitle);
      player.addRemoteTextTrack(subtitle, false);
    });

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const setVideoUrl = (url) => {
    console.log("ONICHAN");
    console.log(url);
    setURLvideo(url);
    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          src: url,
          type: "video/mp4",
        },
      ],
    }));
  };

  const setVideoUrl2 = (url) => {
    console.log("ONICHAN2");
    console.log(url);
    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: [
        {
          src: url,
          type: "video/mp4",
        },
      ],
    }));
  };

  const setSubtitlesVideo = (subtitulos) => {
    console.log("Cambio En Subtitulos");
    console.log(subtitulos);
    const subtitleItems = [];
    subtitulos.files.forEach((sub) => {
      //let path = `http://localhost:3977/api/v1/stream/video/${sub.filename}`
      let path =
        ENV.BASE_API + "/" + ENV.API_ROUTES.STREAM_DATA + "/" + sub.filename;

      console.log(path);
      subtitleItems.push({
        kind: "captions",
        label: sub.language_full.toUpperCase(),
        src: path, // Ajusta la ruta del archivo de subtítulos según sea necesario
        srclang: sub.language.substring(0, 2).toLowerCase(), // Ajusta el campo del idioma según corresponda en tus datos de subtítulos
      });
    });

    console.log("Cambio En Subtitulos 123");
    //setVideoUrl(urlvideo);
    console.log(subtitleItems);

    setAllSubtitles(subtitleItems);
  };

  console.log(videoJsOptions.sources[0].src);

  const handlePlayerReset = () => {
    if (playerRef.current) {
      playerRef.current.load();
    }
  };

 

  return (
    <div className="general-background">
      <Banner />
      <div className="paso1-div">
        <h2 className="paso1-title">
          Carga un video desde tu dispositivo local o desde Google Drive
        </h2>
        <div className="button-div">
          <Button className="custom-button" onClick={onOpenCloseModalLocal}>
            Cargar video desde tu dispositivo local
          </Button>
          <p> </p>
          <Button className="custom-button" onClick={onOpenCloseModalStream}>
            Cargar video con enlace de Google Drive
          </Button>
        </div>
        <h2 className="paso1-title">
          ¿Ya has usado la aplicación? <br /> Utiliza el token que se generó en
          tu última sesión y recupera o elimina tus datos.
        </h2>
        <div className="component-div">
          <InputToken
            setVideoUrl={setVideoUrl}
            setShouldRefreshSubtitles={setShouldRefreshSubtitles}
          />
        </div>
      </div>


      {/* <p>Video URL: {videoJsOptions.sources[0].src}</p> */}
      <div className="video-container">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>

      <BasicModal
        show={showModalLocal}
        close={onOpenCloseModalLocal}
        title="Cargar video desde tu dispositivo local"
      >
        <FormularioModal
          setVideoUrl={setVideoUrl}
          setShouldRefreshSubtitles={setShouldRefreshSubtitles}
        />
      </BasicModal>

      <BasicModal
        show={showModalStream}
        close={onOpenCloseModalStream}
        title="Cargar video con enlace de Google Drive"
      >
        <FormularioModalStreaming setVideoUrl={setVideoUrl} setShouldRefreshSubtitles={setShouldRefreshSubtitles}/>
      </BasicModal>

      {sessionStorage.getItem("token") !== null && (
        <Message className="custom-message-token" size="huge">
          <h3 className="header-token-zone">
            Token de autenticación
          </h3>
          <p className="text-token-zone">
            Guarda este token para recuperar o borrar tus datos más adelante.
          </p>
          <Message.Content>
            <Input
              label={{ icon: "key" }}
              labelPosition="left corner"
              fluid
              value={sessionStorage.getItem("token")}
              readOnly
              className="center aligned"
            />
          </Message.Content>
        </Message>
      )}

      <div className="subtitles-container">
        <FormularioTraduccion />
        <Divider />
        <ListSubtitles
          shouldRefreshSubtitles={shouldRefreshSubtitles}
          setShouldRefreshSubtitles={setShouldRefreshSubtitles}
          setSubtitlesVideo={setSubtitlesVideo}
          setShouldReloadPlayer={setShouldReloadPlayer}
        />
      </div>
    </div>
  );
}
