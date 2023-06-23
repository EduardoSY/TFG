import React, {useEffect, useState} from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import {Formik, useFormik} from "formik";
import { initialValues, validationSchema } from "./FormularioTraduccion.form";
import axios from 'axios';
import { Translation } from "../../../api/translation";

const translationController = new Translation();

export function FormularioTraduccion() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [availableLanguages, setAvailableLanguages] = useState("");
    //const languages = translationController.getTranslationLanguages();
    
    // try {
    //   const languages = translationController.getTranslationLanguages();
    //   // Accede al resultado aquí
    //   console.log(languages);
    // } catch (error) {
    //   // Maneja cualquier error que ocurra durante la ejecución de la promesa
    //   console.error(error);
    // }
    // ;

    useEffect(() => {
      translationController.getTranslationLanguages()
      .then((response) => {
        setAvailableLanguages(response);
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
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
            const response = translationController.requestTranslation(formValue, token);
          } catch (error) {
            console.error(error);
          }
        },
      });
    
  return (
    <Form onSubmit={formik.handleSubmit}>
        {/* <Form.Input name="file" type="file" placeholder="Fichero" accept="video/*"/> */}
        <Form.Field>
        <label>Idioma</label>
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
        <Form.Button type="submit" primary fluid onClick={() => console.log(`Has marcado ${selectedLanguage}`)}>
        Enviar
      </Form.Button>
</Form>
  )
}
