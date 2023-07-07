const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); // doc data json
app.use(express.urlencoded({ extended: true })); // Doc Data arr obj ...

app.use("/", (req, res) => {
  res.send("SERVER ONNNNN");
});

app.listen(port, () => {
  console.log("server running on the port " + port);
});
