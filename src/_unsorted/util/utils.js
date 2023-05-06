/*
 * -----------------------------
 * File - utils.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
const { createHash } = require("crypto");

const pwd = str => createHash("sha256").update(process.env.SALT.concat(str)).digest("hex");

module.exports = { pwd };
