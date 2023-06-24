import React, {useState}from 'react';
import axios from 'axios';
import { Form, Dropdown, Button} from 'semantic-ui-react';
import { Subtitles } from '../../../api/subtitles';

const subtitlesController = new Subtitles();

export function FormularioModalStreaming({ setVideoUrl }) {
    const [videoUrlstate, setVideoUrlstate] = useState('');

    const options = [
        { key: 'es', text: 'Español', value: 'Español' },
        { key: 'en', text: 'Inglés', value: 'Inglés' },
        { key: 'fr', text: 'Frances', value: 'Frances' },
      ];


        const [URL, setURL] = useState(null);

        const handleInputChange = (event) => {
          setVideoUrlstate(event.target.value);
        };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const response = await axios.post('http://localhost:3977/api/v1/transcrip/speechtext/url', { videoUrlstate });
    subtitlesController.setAccessToken(response.data.uniqueId);
    console.log(response.data);
    setVideoUrl(response.data.newURL);
    

  };
  return (
    <Form>
        <Form.Field>
        <label>URL del video</label>
        <input placeholder='URL' value={videoUrlstate} onChange={handleInputChange}/>
      </Form.Field>
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}
