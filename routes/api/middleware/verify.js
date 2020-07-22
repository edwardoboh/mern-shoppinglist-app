// Middleware to verify user token and convert it to the id it represents
const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Permission Denied, No user Token" });
  }

  jwt.verify(token, config.get("jwt_secret"), (err, id_number) => {
    if (err) {
      return res.status(401).json({ msg: "Access Denied, Invalid Token" });
    }
    req.user = id_number;
    next();
  });
}

module.exports = auth;
