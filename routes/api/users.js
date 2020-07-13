const express = require("express");
const router = express.Router();
const User = require("../../Model/UserModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("./middleware/verify");

// POST url: /api/register
// POST Request to Register a new user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  User.findOne({ email: newUser.email })
    .then((fresh_user) => {
      if (fresh_user) {
        return res.status(403).json({ msg: "User already exists" });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (!err) {
            newUser.password = hash;
            // Let us send token to the header containing the user details

            newUser.save().then((newData) => {
              // res.json(newData);
              jwt.sign(newData.id, config.get("jwt_secret"), (err, token) => {
                res.json({
                  token,
                  user: {
                    id: newData.id,
                    name: newData.name,
                    email: newData.email,
                  },
                  msg: "Registration Succesful",
                });
              });
            });
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// DELETE url: /api/register
// Delete request to remove all users from database
router.delete("/", (req, res) => {
  User.deleteMany().then(() => {
    res.json({ msg: "All users succesfully cleared" });
  });
});

// GET url: /api/register
// Get the user info from the id in the token
router.get("/", auth, (req, res) => {
  const user_id = req.user;

  User.findById(user_id).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

module.exports = router;
