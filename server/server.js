//imported libraries
const express = require("express");
require("dotenv").config();
const massive = require("massive");
const session = require("express-session");
const socket = require("socket.io");
const app = express();
// working to this point
const sharedSession = require("express-socket.io-session");
//all libraries have been installed, double check package.json
//main and proxy set up in package.json to "main":"server/server.js", "proxy":"http://localhost:4000"

//deconstruct of .env file:
const { SECRET, CONNECTION_PORT, SERVER_PORT } = process.env;
//controller imports
const qc = require("./controllers/questionsController");
const ac = require("./controllers/authController");
const gc = require("./controllers/gameController")

//Middleware
app.use(express.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Socket.io initialization
const io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`Our Group Project is over ${SERVER_PORT}`)
  )
);

//
io.use(
  sharedSession(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false
    }),
    { autoSave: true }
  )
);

let playerID = 1;// used in sockets for guest ID
// Socket.io Listeners
io.on("connection", socket => {
  console.log("connected to socket");

  //Join Room
  socket.on("join room", data => {
    console.log(socket.handshake.session);
    if (!socket.handshake.session.socketSession) {
      socket.handshake.session.socketSession = data;
      socket.handshake.session.save();
    }
    const { socketSession } = socket.handshake.session;
    socket.join(socketSession.room);
    console.log("joined room ", socketSession.room);
    io.to(socketSession.room).emit("room joined", socketSession);
  });

  // Add name to users array
  socket.on("display name", data => {

    if (!socket.handshake.session.players)
      socket.handshake.session.players = [];
    const { players } = socket.handshake.session;
    players.push(data.username);
    socket.handshake.session.save();

    console.log("room socket hit: blast", socket.handshake.session.players);
    io.to(data.room).emit(
      "display name response",
      {players: socket.handshake.session.players, setID: data.setID, playerID }
    );
    ++playerID;
  });

  // Update only my id
  socket.on('update my id', data => {
    socket.emit('set myid on state', data)
  })

  // Update everyone's users arrays & setID
  socket.on('users array changed', data => {
    io.to(data.room).emit('update users array', data)
    console.log('update')
  })

  // begin the game
  socket.on('game start', data => {
    socket.to(data.room).broadcast.emit('run begin function', data)
    console.log('game start')
  })

  // host has left, kick everyone out
  socket.on('host has left', data => {
    socket.to(data.room).broadcast.emit('kick everyone out', data)
    console.log('host has left.')
  })

  // updates and displays points
  socket.on('update points', data => {
    io.to(data.room).emit('display points', data)
    console.log('updated points')
  })
});

// Account Endpoints
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.post("/auth/logout", ac.logout);
app.put("/auth/edit/:id", ac.changeUser);
app.get("/auth/user", ac.getUser);
app.delete('/auth/user/delete', ac.deleteUser);

//Question_sets endpoints
app.get('/set/user', qc.getSets); //this is the users question_sets for his dashboard.
app.get('/set/all', qc.allGameSets); // this is both the user and our question_sets for the create game page
app.post('/set/user/create', qc.createNewSet); //this creates a new empty set for specific user
app.delete('/set/user/delete/:setID', qc.deleteQuestionSets); // delete sets

app.get('/set/getedit/:setID', qc.getSpecificSet); // this is to get the specific set by id to edit

//added questions to new sets per user
app.post('/set/user/question/', qc.addQuestionsToSet);

//delete specific question from users set
app.delete('/set/user/edit/delete/', qc.editQuestionDelete)

//CreateSet endpoints
app.get('/question/all', qc.getAllQuestions); //gets all questions
app.get('/question/:category', qc.getByCategory) //gets by category


//Game Room Endpoints
app.get('/game/set/:setID', gc.getGameSets)

//require in db through massive, listen to server for connection
massive(CONNECTION_PORT).then(connection => {
  app.set("db", connection);
  console.log("Connected to Database");
});
