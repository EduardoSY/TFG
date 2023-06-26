import React from 'react';
import {Button, Icon, Confirm, Container} from "semantic-ui-react";
import "./ListSubtitlesItem.scss";
import { ENV } from "../../../../utils";

export  function ListSubtitlesItem(props) {
    console.log(props);
    const {subtitle} = props;
    console.log("THIS IS SPARTA");
    console.log(subtitle);

    const finalURL = ENV.BASE_API+"/"+ENV.API_ROUTES.DOWNLOAD_VTT + "/" + subtitle.filename;
    console.log(finalURL);
    
    const downloadVTT = () => {
      const link = document.createElement('a');
      link.href = finalURL;
      link.download = subtitle.filename;
      link.click();
    };

  return (
    <Container>
    <div className='subtitles-item__info'>
        <div className='subtitles-item__info-title'>
            {subtitle.filename}
        </div>
        <div>
          <span>Otra cosa random</span>
          <Button onClick={downloadVTT} download>
            Descargar
          </Button>
        </div>
    </div>
    </Container>
  )
}
