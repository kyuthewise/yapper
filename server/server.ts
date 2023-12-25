const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors')
const multer = require('multer');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.NEXTAUTH_URL
}));

app.options('*', cors()); 

mongoose.connect(process.env.MONGODB_URL);

const server = http.createServer(app);
const connectedUsers = [];
const users = {}

const io = socketIO(server, {
  cors:{
    origin: process.env.NEXTAUTH_URL,
    methods: ["GET", "POST"]
  }
});

io.on('connection', async (socket) => {



socket.on('login', (userid) => {

  users[userid] = socket.id

})

  socket.on('clientMessage', (data) => {

    const user = {
      username: data.userId,
      socketId: socket.id
    }
    connectedUsers.push(user)
    
    io.emit('serverMessage', { message: 'Message received on the server', data });
  });

  io.emit('updateUserList', connectedUsers);
  // Handle chat events
  socket.on('chat message', (msg, userid, selectedUser) => {

    const msge = {
      message: msg,
      userid: userid,
      selectedUser: selectedUser
    }
    io.emit('chat message', msge); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    
    const index = connectedUsers.findIndex(user => user.socketId === socket.id);
    if (index !== -1) {
      connectedUsers.splice(index, 1);

    }

  });
});

const PORT = process.env.PORT || 3001; 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});