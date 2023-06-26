import React from 'react';
import "./Banner.scss";
import { Container } from 'semantic-ui-react';

export  function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>Reproduce, subtitula y disfruta</h1>
            <h2>Con esta aplicación podrás subir un video
              desde tu dispositivo o cargar uno desde Google Drive,
              reproducirlo en nuestro reproductor y añadir
              subtítulos si lo deseas.
              Además, si estás aprendiendo idiomas podrás traducir los
              subtítulos al idioma que desees.
              123456
            </h2>
        </Container>

        <div className='banner_dark'/>  
    </div>
  )
}
