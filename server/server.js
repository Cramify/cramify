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

// Set up Socket.io
  const io = socket(app.listen(SERVER_PORT, () => console.log(`Our Group Project is over ${SERVER_PORT}`)))
  io.on('connection', socket => {
    console.log('socket connected')
    socket.on('join room', data => {
      socket.join(data.room)
      socket.emit('display name', data)
    })
  })

// Account Endpoints
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.post("/auth/logout", ac.logout);
app.put("/auth/edit/:id", ac.changeUser);
app.get("/auth/user", ac.getUser);

//Question_sets endpoints
app.get('/set/user', mc.getSets); //this is the users question_sets for his dashboard.
app.get('/set/all', mc.allGameSets); // this is both the user and our question_sets for the create game page
app.post('/set/user/create', mc.createNewSet); //this creates a new empty set for specific user
app.delete('/set/user/delete/:set_id', mc.deleteQuestionSets); // delete sets

//added questions to new sets per user
app.post('/set/user/question/', mc.addQuestionsToSet);

//question endpoints
app.get('/question/all', mc.getAllQuestions);

//require in db through massive, listen to server for connection
massive(CONNECTION_PORT).then(connection => {
  app.set("db", connection);
  console.log('Connected to Database')
});
