import React, {useState} from 'react';
import {Banner, VideoJS, BasicModal, FormularioModal} from "../../components/Web";
import videojs from 'video.js';
import { Button } from 'semantic-ui-react';

export function Home() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [videoJsOptions, setVideoJsOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://127.0.0.1:8887/Muito_ArmaCSGO_Esp.mp4',
      type: 'video/mp4'
    }]
  });

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
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
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const setVideoUrl = (url) => {
    setVideoJsOptions((prevOptions) => ({
      ...prevOptions,
      sources: [{
        src: url,
        type: 'video/mp4'
      }]
    }));
  };

  console.log(videoJsOptions.sources[0].src);
  
  return (
    
    <div>
        <Banner />
        <Button primary onClick={onOpenCloseModal}>Cargar video</Button>
        <p>Video URL: {videoJsOptions.sources[0].src}</p>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        <BasicModal 
        show={showModal} 
        close={onOpenCloseModal} 
        title="Cargar video" >
          <FormularioModal setVideoUrl={setVideoUrl}/>
        </BasicModal>

    </div>

   
  );
}
