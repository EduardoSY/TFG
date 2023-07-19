import React, {useEffect, useState} from 'react';
import { Button, Form, Dropdown, Message } from 'semantic-ui-react';
import {Formik, useFormik} from "formik";
import { initialValues, validationSchema } from "./FormularioTraduccion.form";
import axios from 'axios';
import { Translation } from "../../../api/translation";

import "./FormularioTraduccion.scss";

const translationController = new Translation();

export function FormularioTraduccion() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [availableLanguages, setAvailableLanguages] = useState("");
    const [loadingButton, setLoadingButton] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);
    function wait(delay) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

    useEffect(() => {
      translationController.getTranslationLanguages()
      .then((response) => {
        setAvailableLanguages(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


    useEffect(() => {
      if (formSuccess) {
        const timer = setTimeout(() => {
          setFormSuccess(false);
        }, 10000);
  
        return () => clearTimeout(timer);
      }
    }, [formSuccess]);
    
    const modifiedObj = [];

    for (let key in availableLanguages) {
      const item = availableLanguages[key];
      const modifiedItem = {
        key: item.language,
        text: item.name,
        value: item.language,
      };
      modifiedObj.push(modifiedItem);
    }


      const handleLanguageChange = (e, { value }) => {
        formik.setFieldValue('selectedLanguage', value);
        setSelectedLanguage(value);
      };

      const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const token = sessionStorage.getItem('token');
           
            setLoadingButton(true);
            const response = translationController.requestTranslation(formValue, token);
            setLoadingButton(false);
            setFormSuccess(true);
          } catch (error) {
            console.error(error);
          }
        },
      });
  return (
    <Form success={formSuccess} onSubmit={formik.handleSubmit}>
        <Form.Field>
        <h1 className='titulo-traduccion'>¿Te interesa otro idioma? Traduce los subtítulos</h1>
        <Dropdown
            placeholder='Selecciona el idioma del video'
            fluid
            selection
            options={modifiedObj}
            value={formik.values.selectedLanguage}
            onChange={handleLanguageChange}
            error={formik.touched.selectedLanguage && formik.errors.selectedLanguage}
            
        />
        </Form.Field>
<div className='test'>
        <Button  className='custom-button_traduccion' fluid type="submit" loading={loadingButton} onClick={() => console.log(`Has marcado ${selectedLanguage}`)}>
        Traducir subtítulos
      </Button>
      </div>
      <Message
      success
      header='Traducción solicitada'
      content='En breves momentos tendrás lista la transcripción. Puede tardar unos minutos. Pulsa el botón de recargar para actualizar la lista de subtítulos.'
    />

</Form>
  )
}
