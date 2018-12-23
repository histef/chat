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
  io.emit('this', { will: 'be received by everyone'});
  console.log('a user connected', connections.length);

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1)
    // io.emit('user disconnected', connections.length);
    console.log('user disconnected', connections.length)
  });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('server running');

