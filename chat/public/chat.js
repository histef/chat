const socket = io.connect('http://localhost:3000');

const message = document.getElementById("message");
const sendBtn = document.querySelector('#send');
const output = document.querySelector('#output');
//for broadcasting a message
const broadcast = document.querySelector('#broadcast');

const chat = document.querySelector('#chat');
const messageForm = document.querySelector("#message-form");

// emit events
//will emit to everyone including sender
sendBtn.addEventListener('click', (e) => {
  socket.emit('chat-message', {
    message: message.value
  })
})

//emit to everyone BUT sender. 1st param must match server-side socket.on
message.addEventListener('keypress', () => {
  socket.emit('typing', message.value)
})

//listen for events
socket.on('chat-message', data => {
  //clear broadcast when user sends message
  broadcast.innerHTML = '';
  output.innerHTML += `<p>${data.message}</p>`;
})

socket.on('typing', data => {
  broadcast.innerHTML = `<p><em> ${data} is typing</em></p>`
})
