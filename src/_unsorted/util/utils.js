const { createHash } = require("crypto");

const pwd = (str) =>
  createHash("sha256").update(process.env.SALT.concat(str)).digest("hex");

module.exports = { pwd };
