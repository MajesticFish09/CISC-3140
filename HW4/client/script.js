const socket = io('http://localhost:3000');

// Get HTML elements
const messageForm = document.getElementById('message-form'); // Message form
const messageInput = document.getElementById('message-input'); // Message input field
const messagesDiv = document.getElementById('messages'); // Message display area
const usernameModal = document.getElementById('username-modal'); // Username popup
const usernameInput = document.getElementById('username-input'); // Username input
const usernameSubmit = document.getElementById('username-submit'); // Submit button

// Set username
usernameSubmit.addEventListener('click', () => {
  const username = usernameInput.value.trim(); // Get entered username
  if (username) {
    socket.emit('set username', username); // Send username to server
    usernameModal.classList.add('hidden'); // Hide popup so you can see the chat
  }
});

// Send message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page refresh and connecting as a new user
  const message = messageInput.value.trim(); // Get message text
  if (message) {
    socket.emit('chat message', message); // Send message to server
    messageInput.value = ''; // Clears the message box after you send a message
  }
});

// Display messages for when the user sent the time
function displayMessage(data) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `
    <div>
      <span class="user">${data.user}</span>
      <span class="time">${data.time}</span>
    </div>
    <div>${data.text}</div>
  `;
  messagesDiv.appendChild(messageElement); // add in messages
  messagesDiv.scrollTop = messagesDiv.scrollHeight;   // allow to scroll to bottom
}

// Display notification (either join or leave)
function displayNotification(msg) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = msg;
  messagesDiv.appendChild(notification);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle events
socket.on('chat message', displayMessage);
socket.on('message history', (history) => {
  history.forEach(displayMessage);
});
socket.on('user joined', displayNotification);
socket.on('user left', displayNotification);