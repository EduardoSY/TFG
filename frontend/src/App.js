import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WebRouter } from './router';

function App() {
  sessionStorage.clear();

  return (
    <BrowserRouter>
      <WebRouter />
    </BrowserRouter>
  );
}

export default App;
