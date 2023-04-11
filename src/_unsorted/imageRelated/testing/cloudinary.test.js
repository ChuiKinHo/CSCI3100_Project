import cloudinary from '../cloudinary';
import fs from "fs";
import path from 'path';

const { uploadImage, cloudinaryV2 } = cloudinary;

// Read the image file into a buffer
const imagePath = path.join(__dirname, 'yes.jpg');
const imageData = fs.readFileSync(imagePath);
  
// Call uploadImage function with the image buffer
uploadImage.uploadImage(imageData).then(url => {
    console.log(url);
  })
  .catch(error => {
    console.error(error);
  });