const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const apiItems = require("./routes/api/items");
const apiUsers = require("./routes/api/users");
const apiAuth = require("./routes/api/auth");

const path = require("path");

app.use(express.json());
app.use("/api/items", apiItems);
app.use("/api/register", apiUsers);
app.use("/api/login", apiAuth);

app.get("/", (req, res) => {
  res.send("<h2>NodeJs Server runing</h2>");
});

mongoose
  .connect(config.get("mongodbURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection To Database Was Succesful"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));
