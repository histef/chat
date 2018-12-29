const socket = io.connect('http://localhost:3000');

const username = document.querySelector('#username');
const message = document.getElementById("message");
const sendBtn = document.querySelector('#send');
const output = document.querySelector('#output');
//for broadcasting a message
const broadcast = document.querySelector('#broadcast');


/*EMIT EVENTS (CLIENT)*/
//will emit to everyone including sender
//note: socket.emit takes in the actual values
sendBtn.addEventListener('click', () => {
  socket.emit('chat-message', {
    username: username.value,
    message: message.value
  })
})

//emit to everyone BUT sender.
message.addEventListener('keypress', () => {
  socket.emit('typing', username.value)
})

//listen for events. 1st param must match server-side socket.on
socket.on('chat-message', data => {
  //clear broadcast when user sends message
  broadcast.innerHTML = '';
  output.innerHTML += `<p><strong>${data.username}: </strong> ${data.message}</p>`;
  message.value = '';
})

socket.on('typing', data => {
  broadcast.innerHTML = `<p><em> ${data} is typing</em></p>`
})
