const http = require("http");
const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");
const mongoconnect = require("./config/dbconnection.json");
const Message = require('./model/Message');
const path = require("path");

// Connect to MongoDB
mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch(err => console.error(err));

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

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*', // adjust for your frontend domain in production
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Client joins their room
  socket.on('joinRoom', ({ userId, role }) => {
    const room = `room_${userId}`;
    socket.join(room);
    console.log(`${role} ${userId} joined ${room}`);
  });

  // Admin joins the same room as client
  socket.on('adminJoinRoom', async ({ clientId }) => {
    const room = `room_${clientId}`;
    socket.join(room);

    try {
      const history = await Message.find({ toClientId: clientId }).sort({ timestamp: 1 });
      socket.emit('messageHistory', history);
    } catch (error) {
      console.error('Failed to get message history:', error);
    }
  });

  // Send message to everyone in the room
  socket.on('sendMessage', async ({ toClientId, message, from }) => {
    const room = `room_${toClientId}`;

    try {
      await Message.create({ toClientId, message, from });
      socket.to(room).emit('receiveMessage', { message, from });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
