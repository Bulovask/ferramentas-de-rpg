const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
require('dotenv').config(); // Para usar variáveis de ambiente

// Configurações do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.API_SECRET
});

function uploadImage(fileBuffer, folderName, imageName, format = 'png') {
  return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
          {
              public_id: `${folderName}/${imageName}`, // Nome da imagem na pasta
              resource_type: 'image', // Opcional: define o tipo de recurso (ex: imagem, vídeo)
              format
          },
          (error, result) => {
              if (error) {
                  return reject(error); // Rejeita a Promise em caso de erro
              }
              resolve(result); // Resolve a Promise com o resultado
          }
      );

      // Converte o buffer em um stream legível e o finaliza
      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null); // Indica o fim do stream
      readableStream.pipe(stream); // Faz o upload
  });
};

module.exports = {
  cloudinary, uploadImage
};