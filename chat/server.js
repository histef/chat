const app = require('express')(); //initialize 'app' to be a fn hndler to supply to HTTP server
// const express = require('express');
// const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

users = [];
connections = [];

//static file
app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/index.html')
})

// listens on the 'connection' event for incoming sockets(new user), and logs it to the console.
io.on('connection', function(socket){ //connects socket.io on server, now need to connect to client(see index.html)
  connections.push(socket);
  io.emit('this', { will: 'be received by everyone'});
  console.log('new user connected', socket.id, connections.length);

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1)
    io.emit('user disconnected', connections.length);
    console.log('user disconnected', connections.length)
  });

  socket.on('send message', data => {
    io.emit('new message', {msg: data})
    console.log('got message: data')
  })
});

const port = process.env.PORT || 3000;
server.listen(port, console.log('server running'));

