import React, { useEffect, useState} from 'react';
import "./ListSubtitles.scss";
import { Subtitles } from '../../../../api/subtitles';

const subtitlesController = new Subtitles();

export function ListSubtitles() {
  const [subtitles, setSubtitles] = useState(null);
  console.log(subtitles);

  useEffect(() => {
    (async() => {
      try{
        const response = await subtitlesController.getSubtitles(1686582745966);
        setSubtitles(response);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])
  

  return (
    <div>
        <h2>LISTAR SUBTITULOS</h2>
    </div>
  );
}
