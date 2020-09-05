const express = require("express");
const route = require("./routes/routes");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const firebase = require('firebase-admin');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Settings
app.set("port", process.env.PORT || 3000);

// Routing
app.use(route);
route.set("view engine", "hbs");
route.set("views", __dirname + "/views");
route.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);

// Static
app.use(express.static(__dirname + "/public"));

module.exports = app;
