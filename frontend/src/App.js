import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { BrowserRouter } from 'react-router-dom';
import { WebRouter } from './router';

function App() {
  // const [file, setFile] = useState(null);

  // const handleChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('video', file);

  //   const response = await axios.post('http://localhost:3977/api/v1/transcrip/speechtext', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //   });

  //   console.log(response.data);
  // };

  // //HOLA

  return (
    // <div>
    //   <Button primary>Primary</Button>
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" accept="video/*" onChange={handleChange} />
    //     <button type="submit">Enviar</button>
    //   </form>
    // </div>
    <BrowserRouter>
      <WebRouter />
    </BrowserRouter>
  );
}

export default App;
