require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const auth = require("./routes/auth");
const instances = require("./routes/instances");
var cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000, http://localhost:8000"
  );
  next();
});
app.use(cors());

auth(app);

instances(app);

app.listen(8080, () => {
  console.log("Server up and running at localhost:8080");
});
