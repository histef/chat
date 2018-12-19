const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

const port = process.env.PORT || 3000;
server.listen(port);
console.log('server running');

app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/index.html')
})