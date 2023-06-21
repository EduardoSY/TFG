import React, {useState} from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

export function FormularioTraduccion() {
    const response = axios.get('http://api-free.deepl.com', {
      headers: {
        'Authorization': 'DeepL-Auth-Key b9735e22-0655-c703-e64b-62c08bfbe09f:fx'
      },
    });
    console.log(response);
  return (
    <Form>
        <Form.Input name="file" type="file" placeholder="Fichero" accept="video/*"/>
        <Form.Field>
        <label>Idioma</label>
        <Dropdown
            placeholder='Selecciona el idioma del video'
        />
        </Form.Field>
        <Button type='submit' onClick={console.log("hola")}>Submit</Button>
</Form>
  )
}
