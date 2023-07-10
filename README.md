# TFG: TITULO --- Eduardo Da Silva
En este repositorio de aloja el código fuente realizado para el Trabajo de Fin de Grado.

<details>
  <summary>Contenido del readme</summary>
  <ol>
    <li>
      <a>El proyecto</a>
    </li>
    <li>
      <a>Uso</a>
      <ul>
        <li><a>Acceso a la web</a></li>
        <li><a>Despliegue local</a></li>
      </ul>
    </li>
     <li>
      <a>Licencia</a>
    </li>
     <li>
      <a>Contacto</a>
    </li>
  </ol>
</details>

## El proyecto
La creación de contenido audiovisual está cada vez más en auge y con ello surgen nuevas
necesidades siendo una de las más importantes hacer que todo ese material sea más accesible. Una
forma de lograrlo es mediante la inclusión de subtítulos.

El objetivo de este trabajo ha sido desarrollar un aplicativo web que permite la reproducción y
subtitulación de videos. Como funcionalidades adicionales también se permite la traducción y
descarga de dichos subtítulos. Todo esto se plantea siguiendo una filosofía minimalista, sin
necesidad de registro, donde el usuario podrá interactuar directamente con la aplicación sin pasos
adicionales.

Se realiza un análisis de las diversas alternativas disponibles en la actualidad para solventar
dicha problemática. Se analizan aplicaciones similares así como herramientas con las que poder
llevar a cabo el proyecto.

Tras ello se comienza el desarrollo de la aplicación. Para llevar a cabo las funcionalidades de
reproducción, transcripción y traducción se hace uso de herramientas y APIs externas tales como
VideoJS, SpeechText.AI API y DeepL API.

La aplicación está disponible para todos los usuarios de manera gratuita y continua gracias al
despliegue en la plataforma Render.

## Uso
### Acceso a la web
La aplicación está desplegada en la plataforma Render. Puede acceder mediante el siguiente enlace: 
[EasySubtitles](https://easysubtitlestfg.onrender.com/)

### Despliegue local
En caso de querer acceder al código fuente y desplegar la aplicación de manera local debe realizar lo siguiente.
1. Clonar el repositorio
   
2. Acceder tanto al directorio de backend y frontend

   2.1. Backend - ```cd Backend```

   2.2. Frontend - ```cd Frontend```

*Las siguientes acciones se realizan en ambos directorios*

3. Instalar dependencias

     ``` npm i ```

4. Se lanza la parte frontend de la aplicación

    ``` npm run start ```

## Licencia
Este proyecto está bajo la licencia Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)
<br>
<img src="https://conogasi.org/wp-content/uploads/2017/05/CC-BY-NC-SA-4.0.jpg" height="80">

## Contacto
Eduardo Da Silva Yanes - alu0101104911@ull.edu.es
 
