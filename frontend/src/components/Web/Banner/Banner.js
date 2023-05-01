import React from 'react';
import "./Banner.scss";
import { Container } from 'semantic-ui-react';

export  function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>Aprende nuevas tecnologías web y movil</h1>
            <h2> Con esta verga</h2>
        </Container>

        <div className='banner_dark'/>  
    </div>
  )
}
