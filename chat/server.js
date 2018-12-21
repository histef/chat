const app = require('express')(); //initialize 'app' to be a fn hndler to supply to HTTP server
// const express = require('express');
// const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/index.html')
})

// listen on the 'connection' event for incoming sockets, and logs it to the console.
io.on('connection', function(socket){
  connections.push(socket);
  console.log('a user connected');
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('server running');

