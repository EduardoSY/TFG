import React from 'react';
import { Popup, Image } from 'semantic-ui-react';
import "./InfoIconPopUp.scss";

export function InfoIconPopUp({ imagePath, altText }) {
  return (
    <Popup
    wide
    position = 'bottom left'
    trigger={<i className="info circle icon"></i>}
    content={<Image src={require("../../../assets/acceso_drive.jpg")} alt={altText} />}
    on="hover"
  />
  )
}

