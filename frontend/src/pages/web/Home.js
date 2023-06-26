import React, { useState } from "react";
import {
  Banner,
  VideoJS,
  BasicModal,
  FormularioModal,
  FormularioModalStreaming,
  FormularioTraduccion
} from "../../components/Web";
import { ListSubtitles } from "../../components/Web/Subtitles";
import videojs from "video.js";
import { Button, Container, Divider } from "semantic-ui-react";
import "./Home.scss";

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
    preload: 'none',
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

    //const track = player.addRemoteTextTrack({
    //   kind: 'captions',
    //   label: 'Subtitles',
    //   src: `http://127.0.0.1:8887/${sessionStorage.getItem('token')}_original.vtt`,
    //   srclang: 'es' // Idioma de los subtítulos (código ISO 639-1)
    // }, false);

    //track.mode = 'showing';
    console.log("CARGAMOS LOS SUBTITULOS");
    console.log(allSubtitles);

    allSubtitles.forEach((subtitle) => {
      console.log(subtitle);
      player.addRemoteTextTrack(subtitle, false);
    });
    //   const track1 = player.addRemoteTextTrack({
    //     kind: 'captions',
    //     label: 'Espain',
    //     src: 'http://127.0.0.1:8887/d62fdb6f-efd7-4caa-8c50-08da1ead76aa_original.vtt',
    //     srclang: 'en'
    // }, false);
      //track1.mode = 'showing';
  
      //track2.mode = 'showing';
    //});

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });

    //var tracks = player.textTracks();
    //console.log("ESTOS SON LOS TRAKOS");
    //console.log(tracks);

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
      let path = `http://127.0.0.1:8887/${sub.filename}`
      subtitleItems.push({
        kind: 'captions',
        label: sub.language,
        src: path, // Ajusta la ruta del archivo de subtítulos según sea necesario
        srclang: sub.language.substring(0, 2).toLowerCase() // Ajusta el campo del idioma según corresponda en tus datos de subtítulos
      });
    });
    
    console.log("Cambio En Subtitulos 123");
    //setVideoUrl(urlvideo);
    console.log(subtitleItems);
  //   player.addRemoteTextTrack({
  //     kind: 'captions',
  //     label: 'Ingles',
  //     src: 'http://127.0.0.1:8887/d62fdb6f-efd7-4caa-8c50-08da1ead76aa_EN-US.vtt',
  //     srclang: 'en'
  // }, false);

    setAllSubtitles(subtitleItems);
    //playerRef.current.trigger('loadstart');
  };

  console.log(videoJsOptions.sources[0].src);

  const handlePlayerReset = () => {
    if (playerRef.current) {
      playerRef.current.load();
    }
  };

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
        <Button onClick={handlePlayerReset}>Reiniciar reproductor</Button>

      </div>
      
      <BasicModal
        show={showModalLocal}
        close={onOpenCloseModalLocal}
        title="Cargar video"
      >
        <FormularioModal setVideoUrl={setVideoUrl} setShouldRefreshSubtitles={setShouldRefreshSubtitles}/>
      </BasicModal>

      <BasicModal
        show={showModalStream}
        close={onOpenCloseModalStream}
        title="Cargar URL"
      >
        <FormularioModalStreaming setVideoUrl={setVideoUrl} />
      </BasicModal>
      <div className="subtitles-container">
      <FormularioTraduccion />
      
        <ListSubtitles shouldRefreshSubtitles={shouldRefreshSubtitles} setShouldRefreshSubtitles={setShouldRefreshSubtitles}
        setSubtitlesVideo={setSubtitlesVideo} setShouldReloadPlayer={setShouldReloadPlayer}/>
      </div>
      
    </div>
  );
}




