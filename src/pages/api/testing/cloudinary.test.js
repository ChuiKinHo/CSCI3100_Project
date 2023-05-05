/*
 * -----------------------------
 * File - cloudinary.test.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { uploadImage } from '../../../_unsorted/imageRelated/cloudinary/cloudinary.js';
import fs from "fs";
import path from 'path';

export default async function handler(req, res) {
  // Call uploadImage function with the image buffer
  uploadImage('C:\\Users\\Tanja\\Downloads\\Software Engineering\\project\\CSCI3100_Project\\src\\pages\\api\\testing\\yes.jpeg')
    .then(url => {
      console.log(url);
      res.status(200).json({ url });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
 }