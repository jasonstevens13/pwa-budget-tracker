const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// to be able to deploy to heroku, added env
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes/api.js"));

// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// To be able to deploy, added env
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});