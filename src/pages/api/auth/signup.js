/*
 * -----------------------------
 * File - signup.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import dbConnect from '../../../_unsorted/database/dbConnect'
import { pwd } from '../../../_unsorted/util/utils'
import jwt from 'jsonwebtoken'
import { getUserId, loginQuery, adminLoginQuery, getRefTokenByUserId, getRefTokenByUsername, deleteToken, addToken } from '../../../_unsorted/util/queryUtil'
import { User, Token } from "../../../_unsorted/database/schemas";
import { uploadImage } from "../../../_unsorted/imageRelated/cloudinary/cloudinary";

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/auth/login
  switch (method) {
    case 'POST': // Create new User by input
      try {
        // Link to login form
        const username = req.body.username

        console.log(imageData)
        if (await getUserId(username))
          return res.status(401).json({ success: false, data: { error: "Username already taken!" } })

        const name = req.body.name
        const password = pwd(req.body.password);
        console.log(imageData)
        // const img = req.body.img;
        // Upload img to Cloudinary and get the URL
        // const img = "v1681141071/e-rpjoJi_bigger.png" // Placeholder
        const imageData = req.body.imageData;
        console.log(imageData)
        let imgUrl = "v1681141071/e-rpjoJi_bigger.png"
        console.log(imageData)
        try{
          console.log(imageData)
          imgUrl = await uploadImage(imageData);
          console.log("Image uploaded successfully. URL:", imgUrl);
        } catch (error) {
          console.error("Failed to upload image:", error);
          return res.status(403).json({ success: false, data: { error: error } })
        }
        
        const user = await User.create({ username: username, name: name, password: password, usrImg: imgUrl })

        res.status(201).json({ success: true, data: { username: user.username, name: user.name }})
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } })
      }
      break
    
    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
