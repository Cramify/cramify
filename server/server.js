//imported libraries

const express = require("express");
require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const socket = require("socket.io");
//all libraries have been installed, double check package.json
//main and proxy set up in package.json to "main":"server/server.js", "proxy":"http://localhost:4000"

//deconstruct of .env file:
const { SECRET, CONNECTION_PORT, SERVER_PORT } = process.env;
//controller imports
const mc = require("./controllers/mainController");
const ac = require("./controllers/authController");

//Middleware
const app = express();
app.use(express.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//register/login endpoints

app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.post("/auth/logout", ac.logout);

//require in db through massive, listen to server for connection
massive(CONNECTION_PORT).then(connection => {
  app.set("db", connection);
  app.listen(SERVER_PORT, () =>
    console.log(`Our Group Project is over ${SERVER_PORT}`)
  );
});
