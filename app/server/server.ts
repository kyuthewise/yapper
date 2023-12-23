const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors')
const multer = require('multer');
const mongoose = require('mongoose')

const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.options('*', cors());

mongoose.connect('mongodb+srv://kyujook:redert77@cluster0.kzjq4e6.mongodb.net/?retryWrites=true&w=majority');

const server = http.createServer(app);
const connectedUsers = [];
const users = {}

const io = socketIO(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on('connection', async (socket) => {

  console.log(connectedUsers)

socket.on('login', (userid) => {
  console.log(userid)
  users[userid] = socket.id
  console.log(users)
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

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});