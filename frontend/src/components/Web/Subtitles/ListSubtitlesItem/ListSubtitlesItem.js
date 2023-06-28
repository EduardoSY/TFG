import React from "react";
import { Button, Icon, Confirm, Container } from "semantic-ui-react";
import "./ListSubtitlesItem.scss";
import { ENV } from "../../../../utils";

export function ListSubtitlesItem(props) {
  console.log(props);
  const { subtitle } = props;
  console.log("THIS IS SPARTA");
  console.log(subtitle);

  const finalURL =
    ENV.BASE_API + "/" + ENV.API_ROUTES.DOWNLOAD_VTT + "/" + subtitle.filename;
  console.log(finalURL);

  const downloadVTT = () => {
    const link = document.createElement("a");
    link.href = finalURL;
    link.download = subtitle.filename;
    link.click();
  };

  return (
    <Container>
      <div className="subtitles-item">
        <div className="subtitles-item__info">
          <span className="subtitles-item__info-title">
            Subtítulos - Idioma: {subtitle.language_full}
          </span>
          <br/>
          <span className="subtitles-item__info-subtitle">
            Fichero: {subtitle.filename}
          </span>
        </div>
        <div>
          <Button onClick={downloadVTT} download className="custom-input-button_delete">
          <Button.Content>
            <Icon name="download" /> Descargar
          </Button.Content>
          </Button>

        </div>
      </div>
    </Container>
  );
}
