import React, { useEffect, useState} from 'react';
import "./ListSubtitles.scss";
import { Subtitles } from '../../../../api/subtitles';
import { ListSubtitlesItem } from '../ListSubtitlesItem';
import { Loader, Button, Divider} from "semantic-ui-react";
import {map, size} from "lodash";
//import { post } from '../../../../../../backend/app';
import { Translation } from "../../../../api/translation";

const subtitlesController = new Subtitles();



const translationController = new Translation();

export function ListSubtitles({ shouldRefreshSubtitles, setShouldRefreshSubtitles, setSubtitlesVideo, setShouldReloadPlayer}) {
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
      let newData;
      try{
      const language_available = await translationController.getTranslationLanguages();
        
        const token = sessionStorage.getItem('token');
        console.log("ESTE ES EL TOKEN");
        console.log(token);
        const response = await subtitlesController.getSubtitles(token);
        console.log("REEEEESPONSE");
        console.log(response);
          newData = response.files.map(item => {
          console.log(item.language);
          console.log(language_available);
          const auxLanguage = language_available.find(option => option.language === item.language);
          //console.log("KI ISHTO");
          console.log(auxLanguage);
          const language_full = auxLanguage ? auxLanguage.name : item.language;
          console.log(language_full);
          return {
            ...item,
            language_full
          };
         });

        // const newData = response.files.map(item => {
        //   // Objeto con los códigos de idioma y sus correspondientes nombres completos        
        //   // Agrega la propiedad language_full al objeto utilizando el código de idioma
        //   const selectedLanguage = language_available.find(option => option.language === item.language);
        //   const language_full = selectedLanguage ? selectedLanguage.name : "Unknown";

        //   return {
        //     ...item,
        //     language_full
        //   };
        // });

        console.log("VIVA MARIO EL CASAS");
        response.files = newData;
        console.log(response);
        setSubtitles(response);
        setSubtitlesVideo(response);
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
      <h2 className='titulo-subtítulos'>Listado de subtítulos generados</h2>
      <Button primary onClick={onReload}>
          Recarga
        </Button>
        <Divider/>
        <div className='list'>
        {map(subtitles.files, (sub) => (
          <div key={sub.filename} className='item'>
            <ListSubtitlesItem subtitle={sub} />
          </div>
        ))}
      </div>
    </div>
  );
}
