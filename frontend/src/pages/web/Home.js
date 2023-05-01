import React from 'react';
import {Banner, VideoJS} from "../../components/Web";
import videojs from 'video.js';


export function Home() {

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://127.0.0.1:8887/Muito_ArmaCSGO_Esp.mp4',
      type: 'video/mp4'
    }]
  };

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
  return (
    
    <div>
        <Banner />
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
