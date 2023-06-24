import React, { useEffect, useState} from 'react';
import "./ListSubtitles.scss";
import { Subtitles } from '../../../../api/subtitles';
import { ListSubtitlesItem } from '../ListSubtitlesItem';
import { Loader, Button} from "semantic-ui-react";
import {map, size} from "lodash";
//import { post } from '../../../../../../backend/app';

const subtitlesController = new Subtitles();

export function ListSubtitles({ shouldRefreshSubtitles, setShouldRefreshSubtitles }) {
  const [subtitles, setSubtitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reaload, isRealoading] = useState(true);
  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  //console.log(subtitles.files);

  useEffect(() => {
    let intervalId;
    //if (shouldRefreshSubtitles) {
    (async() => {
      try{
        const token = sessionStorage.getItem('token');
        console.log("ESTE ES EL TOKEN");
        console.log(token);
        const response = await subtitlesController.getSubtitles(token);
        setSubtitles(response);
        setShouldRefreshSubtitles(false);
      } catch (error) {
        console.log(error);
      }
    })();
  //}

  }, [shouldRefreshSubtitles, reload]);

  if (!subtitles && isLoading) return <Loader active inline="centered" />;
  if (!subtitles && !isLoading) return "No hay transcripciones";

  
  console.log(subtitles);

  return (
    <div className='list-subtitles-web'>
      <h2>LDS</h2>
      <Button primary onClick={onReload}>
          Recarga
        </Button>
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
