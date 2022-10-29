const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const sequelize = require("./models");
const user = require("./modules/user/user.routes");


const port = 4242;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/hello', (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});


app.use(user);