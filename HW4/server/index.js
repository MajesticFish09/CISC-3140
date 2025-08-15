const express = require('express'); // import express web 
const http = require('http'); // import http module for making server
const socketIO = require('socket.io'); // import socket for chatting
const path = require('path'); // import path module for file path operations

const app = express(); // make express application
const server = http.createServer(app); // make http server using Express
const io = socketIO(server); // connect socket to the http

const PORT = 3000;
const messageHistory = []; // store all chat message

// Serve client files
app.use(express.static(path.join(__dirname, '../client'))); 

io.on('connection', (socket) => {
  console.log('New user connected'); // show a user connected
  
  // Ask for username
  socket.emit('request username');
  
  // Handles username and stores it
  socket.on('set username', (username) => {
    socket.username = username;
    
    // Send message history
    socket.emit('message history', messageHistory);
    
    // Notify everyone
    io.emit('user joined', `${username} joined the chat`);
  });
  
  // Handle messages
  socket.on('chat message', (msg) => {
    const messageData = {
      user: socket.username || 'Anonymous',
      text: msg,
      time: new Date().toLocaleTimeString()
    };
    
    // Save message
    messageHistory.push(messageData);
    
    // Send to everyone
    io.emit('chat message', messageData);
  });
  
  // Handle disconnections
  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('user left', `${socket.username} left the chat`);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});