import React, { useEffect, useState} from 'react';
import "./ListSubtitles.scss";
import { Subtitles } from '../../../../api/subtitles';
import { ListSubtitlesItem } from '../ListSubtitlesItem';
import { Loader } from "semantic-ui-react";
import {map, size} from "lodash";
//import { post } from '../../../../../../backend/app';

const subtitlesController = new Subtitles();

export function ListSubtitles() {
  const [subtitles, setSubtitles] = useState(null);
  //console.log(subtitles.files);

  useEffect(() => {
    (async() => {
      try{
        const response = await subtitlesController.getSubtitles(1686582745966);
        setSubtitles(response);
      } catch (error) {
        console.log(error);
      }
    })()
  }, []);

  if(!subtitles) return <Loader active inline="centered" />;
  if(size(subtitles) === 0) return "No hay transcripciones";
  
  console.log(subtitles.files[0].filename);

  return (
    <div className='list-subtitles-web'>
      <h2>LDS</h2>
        <div className='list'>
        {map(subtitles.files, (sub) => (
          <div key={sub.filename} className=''>
            <ListSubtitlesItem subtitle={sub} />
          </div>
        ))}
      </div>
    </div>
  );
}
