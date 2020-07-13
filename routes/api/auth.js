const express = require("express");
const router = express.Router();
const User = require("../../Model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// POST url: /api/login
// POST request by user to login
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter All Fields" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "User not recognized" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ msg: "Invalid Credential" });
        }

        jwt.sign(user.id, config.get("jwt_secret"), (err, token) => {
          if (!err) {
            res.status(200).json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
              msg: "Login Succesful",
            });
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
