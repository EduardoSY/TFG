import React, { useEffect, useState } from "react";
import "./ListSubtitles.scss";
import { Subtitles } from "../../../../api/subtitles";
import { ListSubtitlesItem } from "../ListSubtitlesItem";
import { Loader, Button, Divider } from "semantic-ui-react";
import { map, size } from "lodash";
import { Translation } from "../../../../api/translation";

const subtitlesController = new Subtitles();

const translationController = new Translation();

export function ListSubtitles({
  shouldRefreshSubtitles,
  setShouldRefreshSubtitles,
  setSubtitlesVideo,
  setShouldReloadPlayer,
}) {
  const [subtitles, setSubtitles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reaload, isRealoading] = useState(true);
  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      let newData;
      try {
        const language_available =
          await translationController.getTranslationLanguages();

        const token = sessionStorage.getItem("token");

        const response = await subtitlesController.getSubtitles(token);
        newData = response.files.map((item) => {
          const auxLanguage = language_available.find(
            (option) => option.language === item.language
          );

          const language_full = auxLanguage ? auxLanguage.name : item.language;

          return {
            ...item,
            language_full,
          };
        });

        response.files = newData;
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
    <div className="list-subtitles-web">
      <h2 className="titulo-subtítulos">Listado de subtítulos generados</h2>
      <div className="testing">
        <h3>
          ¿No te aparecen los subtítulos en el listado o en el reproductor?{" "}
          <br /> No te preocupes, el proceso puede llevar un tiempo. Pulsa el
          botón de "Actualizar subtítulos" y una vez aparezcan tus subtítulos en
          la lista estarán disponibles en el reproductor.
        </h3>
        <Button className="button-recargar" onClick={onReload}>
          Actualizar subtítulos
        </Button>
      </div>
      <Divider />
      <div className="list">
        {map(subtitles.files, (sub) => (
          <div key={sub.filename} className="item">
            <ListSubtitlesItem subtitle={sub} />
          </div>
        ))}
      </div>
    </div>
  );
}
