import React from 'react';
import {Button, Icon, Confirm} from "semantic-ui-react";
import "./ListSubtitlesItem.scss";

export  function ListSubtitlesItem(props) {
    console.log(props);
    const {subtitle} = props;
    console.log("THIS IS SPARTA");
    console.log(subtitle);

  return (
    <div className='subtitles-item__info'>
        <div className='subtitles-item__info-title'>
            {subtitle.filename}
        </div>
    </div>
  )
}
