import React, { useEffect, useState} from 'react';
import "./ListSubtitles.scss";
import { Subtitles } from '../../../../api/subtitles';
import { ListSubtitlesItem } from '../ListSubtitlesItem';
import { Loader } from "semantic-ui-react";
import {map, size} from "lodash";
//import { post } from '../../../../../../backend/app';

const subtitlesController = new Subtitles();

export function ListSubtitles({ shouldRefreshSubtitles, setShouldRefreshSubtitles }) {
  const [subtitles, setSubtitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //console.log(subtitles.files);

  useEffect(() => {
    if (shouldRefreshSubtitles) {
    (async() => {
      try{
        const token = sessionStorage.getItem('token');
        const response = await subtitlesController.getSubtitles(token);
        setSubtitles(response);
        setShouldRefreshSubtitles(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }
  }, [shouldRefreshSubtitles]);

  if (!subtitles && isLoading) return <Loader active inline="centered" />;
  if (!subtitles && !isLoading) return "No hay transcripciones";

  
  console.log(subtitles);

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
