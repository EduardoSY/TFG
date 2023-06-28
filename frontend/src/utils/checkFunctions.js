export function isGoogleDriveUrl(url) {
    // Expresión regular para verificar si la URL es de Google Drive
    const googleDriveRegex = /^https?:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)(?:\/view\?usp=sharing|usp=drive_link)?$/;
  
    // Verificar si la URL coincide con el patrón de Google Drive
    return googleDriveRegex.test(url);
  }