import React, {useState}from 'react';
import axios from 'axios';
import { Form, Dropdown, Button} from 'semantic-ui-react';

export function FormularioModalStreaming({ setVideoUrlStreaming }) {

    const options = [
        { key: 'es', text: 'Español', value: 'Español' },
        { key: 'en', text: 'Inglés', value: 'Inglés' },
        { key: 'fr', text: 'Frances', value: 'Frances' },
      ];


        const [URL, setURL] = useState(null);

  const handleChange = (event) => {
    setURL(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    //formData.append('video', file);

    const response = await axios.post('http://localhost:3977/api/v1/transcrip/speechtext', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log(response.data);
    const new_video_path = "http://127.0.0.1:8887/" + response.data;
    setVideoUrlStreaming(new_video_path);
    

  };
  return (
    <Form>
        <Form.Field>
        <label>URL del video</label>
        <Form.Input name="file" type="input" placeholder="Fichero" onChange={handleChange}/>
      </Form.Field>
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
      

    </Form>
  )
}
