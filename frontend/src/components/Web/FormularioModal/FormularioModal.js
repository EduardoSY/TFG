import React, {useState}from 'react';
import axios from 'axios';
import { Form, Dropdown, Button} from 'semantic-ui-react';

export function FormularioModal({ setVideoUrl }) {

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

    console.log(response.data);
    const new_video_path = "http://127.0.0.1:8887/" + response.data;
    setVideoUrl(new_video_path);
    

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
