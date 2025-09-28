// netlify/functions/postback.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { file_id, geo, click_id } = event.queryStringParameters || {};

  // Ruta del archivo donde se guardarán los logs
  const filePath = path.join(__dirname, 'log.txt');

  // Texto a guardar
  const logLine = `Archivo: ${file_id || 'N/A'}, País: ${geo || 'N/A'}, Click ID: ${click_id || 'N/A'}, Fecha: ${new Date().toISOString()}\n`;

  try {
    // Guardar el registro en el TXT
    fs.appendFileSync(filePath, logLine);
    console.log('Postback registrado: ', logLine);
  } catch (err) {
    console.error('Error guardando postback:', err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Conversión registrada con éxito" }),
  };
};
