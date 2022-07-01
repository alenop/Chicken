const express = require('express');
const PostgresClient = require("./PostgresClient.js");
const routerChicken = require("./routes/chicken.route");


PostgresClient.init()
  .then(() => console.log('Connected to DB'))

const app = express();
app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(8000, () => console.log('Server started:8000'));

app.use('/chicken', routerChicken);

module.exports = app;