import React, {useState}from 'react';
import axios from 'axios';
import { Form, Dropdown, Button} from 'semantic-ui-react';
import { Subtitles } from '../../../api/subtitles';

const subtitlesController = new Subtitles();


export function FormularioModal({ setVideoUrl, setShouldRefreshSubtitles}) {

    const options = [
        { key: 'es', text: 'Español', value: 'Español' },
        { key: 'en', text: 'Inglés', value: 'Inglés' },
        { key: 'fr', text: 'Frances', value: 'Frances' },
      ];


        const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', file);

    const response = await axios.post('http://localhost:3977/api/v1/transcrip/speechtext', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log("APERRO SANCHEZ");
    console.log(response.data);
    subtitlesController.setAccessToken(response.data.uniqueId);

    console.log("FORM MODAL DATA REPSONSE");
    console.log(response.data.uniqueId);
    //const new_video_path = "http://127.0.0.1:8887/" + response.data.uniqueId +"."+response.data.extension ;
    const new_video_path = "http://localhost:3977/api/v1/stream/video/" + response.data.uniqueId +"."+response.data.extension ;
    setVideoUrl(new_video_path);
    setShouldRefreshSubtitles(true);
    

  };
  return (
    <Form>
        <Form.Input name="file" type="file" placeholder="Fichero" accept="video/*" onChange={handleChange}/>
        <Form.Field>
        <label>Idioma</label>
        <Dropdown
          placeholder='Selecciona el idioma del video'
          fluid
          selection
          options={options}
        />
      </Form.Field>
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
      

    </Form>
  )
}
