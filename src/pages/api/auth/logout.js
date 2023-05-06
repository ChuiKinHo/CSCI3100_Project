/*
 * -----------------------------
 * File - logout.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Delete the token in refreshTokens by the refresh token in the request.
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { deleteToken } from "../../../_unsorted/util/queryUtil";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/auth/logout
  switch (method) {
    case "DELETE": // Create new User by input
      try {
        // db
        // Remove the token in refreshTokens by the refresh token in the request.
        // await deleteToken(req.body.name, req.body.refreshToken)

        // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        if (req.body.admin)
          return res.status(201).json({ success: true, data: { admin: true } });

        // 204: No Content, this request is successfully executed and the token is removed
        const logout = await deleteToken(req.body.username);
        if (!logout.deletedCount)
          return res
            .status(400)
            .json({ success: false, data: "You are not logged in!" });

        res.status(201).json({ success: true, data: logout });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
