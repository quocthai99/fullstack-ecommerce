const express = require("express");
require("dotenv").config();
const dbConnect = require('./src/config/dbConnect')
const initRoutes = require('./src/routes')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
const port = process.env.PORT;

app.use(express.json()); // doc data json
app.use(express.urlencoded({ extended: true })); // Doc Data arr obj ...

dbConnect()
initRoutes(app)


app.listen(port, () => {
  console.log("server running on the port " + port);
});
