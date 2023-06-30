export function isGoogleDriveUrl(url) {
    // Expresión regular para verificar si la URL es de Google Drive
    const googleDriveRegex = /^https?:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)(?:\/view\?usp=sharing|usp=drive_link)?$/;
  
    // Verificar si la URL coincide con el patrón de Google Drive
    return googleDriveRegex.test(url);
  }

  export function isValidUUID(id) {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(id);
  }