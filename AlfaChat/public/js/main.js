const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Username und Raum aus url lesen
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// chat betreten
socket.emit('joinRoom', { username, room });

// Raum und user 
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Nachricht vom server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // auto scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message senden
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // nachricht
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // nachricht an server emit
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Nachrichten in DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Raumname in DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// User DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

// User fragen
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Möchtest du den Chat verlassen?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
