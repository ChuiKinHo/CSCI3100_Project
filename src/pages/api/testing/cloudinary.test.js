import { uploadImage } from '../../../_unsorted/imageRelated/cloudinary/cloudinary.js';
import fs from "fs";
import path from 'path';

export default async function handler(req, res) {
  const imagePath = path.join(__dirname, 'yes.jpeg');
  const imageData = fs.readFileSync(imagePath);
  
  // Call uploadImage function with the image buffer
  uploadImage(imageData)
    .then(url => {
      console.log(url);
      res.status(200).json({ url });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
 }