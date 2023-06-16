import React, { useState } from "react";
import {
  Banner,
  VideoJS,
  BasicModal,
  FormularioModal,
  FormularioModalStreaming,
} from "../../components/Web";
import { ListSubtitles } from "../../components/Web/Subtitles";
import videojs from "video.js";
import { Button } from "semantic-ui-react";
import "./Home.scss";

export function Home() {
  const [showModalLocal, setShowModalLocal] = useState(false);
  const [showModalStream, setShowModalStream] = useState(false);
  const [reload, setReload] = useState(false);
  const [subtitleUrl, setSubtitleUrl] = useState(null);
  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
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

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: true,
  //   responsive: true,
  //   fluid: true,
  //   sources: [{
  //     src: videoUrl || 'http://127.0.0.1:8887/Muito_ArmaCSGO_Esp.mp4',
  //     type: 'video/mp4'
  //   }]
  // };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const setVideoUrl = (url) => {
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

  console.log(videoJsOptions.sources[0].src);

  return (
    <div>
      <Banner />
      <div className="button-div">
        <Button primary onClick={onOpenCloseModalLocal}>
          Cargar video
        </Button>
        <p> </p>
        <Button primary onClick={onOpenCloseModalStream}>
          Cargar URL
        </Button>
      </div>
      <p>Video URL: {videoJsOptions.sources[0].src}</p>
      <div className="video-container">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>

      <BasicModal
        show={showModalLocal}
        close={onOpenCloseModalLocal}
        title="Cargar video"
      >
        <FormularioModal setVideoUrl={setVideoUrl} />
      </BasicModal>

      <BasicModal
        show={showModalStream}
        close={onOpenCloseModalStream}
        title="Cargar URL"
      >
        <FormularioModalStreaming setVideoUrl={setVideoUrl} />
      </BasicModal>

      <ListSubtitles />
    </div>
  );
}
