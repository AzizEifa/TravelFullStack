const http = require("http");
const express = require("express");
const cors = require("cors");
//connectio to db
const mongo = require("mongoose");
const mongoconnect = require("./config/dbconnection.json");

const path = require("path");

mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connect");
  })
  .catch((err) => {
    err;
  });

//
const feedbackRouter = require("./routes/feedbacks");
const usersRouter = require("./routes/users");


const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(express.json());

app.use("/users", usersRouter);
app.use("/feedbacks", feedbackRouter);

const server = http.createServer(app, console.log("server is running"));

server.listen(3000);