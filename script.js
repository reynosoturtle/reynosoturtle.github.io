var page = document.getElementById('page');
var last_pane = page.getElementsByClassName('pane');
last_pane = last_pane[last_pane.length - 1];
var dummy_x = null;

console.log('redy')

window.onscroll = function() {
  // Horizontal Scroll.
  var y = document.body.getBoundingClientRect().top;
  page.scrollLeft = -y;

  // Looping Scroll.
  var diff = window.scrollY - dummy_x;
  if (diff > 0) {
    window.scrollTo(0, diff);
  } else if (window.scrollY == 0) {
    window.scrollTo(0, dummy_x);
  }
}
// Adjust the body height if the window resizes.
window.onresize = resize;
// Initial resize.
resize();

// Reset window-based vars
function resize() {
  var w = page.scrollWidth - window.innerWidth + window.innerHeight;
  document.body.style.height = w + 'px';

  dummy_x = last_pane.getBoundingClientRect().left + window.scrollY;
}

window.onbeforeunload = function() {
  console.log('scrolling to')
  window.scrollTo(2, 2);
}

function updateCount() {
  let counter = document.getElementById('counter');
  counter.innerHTML = localStorage.getItem('counter');
}

function sendChat() {
  event.preventDefault()
  let chat = JSON.parse(localStorage.getItem('chat'))
  console.log(chat)
  let messageInput = document.getElementById('message').value;
  let nameInput = document.getElementById('name').value;
  let chatbox = document.getElementById('chatbox');

  let obj = { name: nameInput, message: messageInput }

  chat.push(obj)
  localStorage.setItem('chat', JSON.stringify(chat))
  updateChat();
}

function updateChat() {
  let chat = JSON.parse(localStorage.getItem('chat'));
  let chatbox = document.getElementById('chatbox');

  chatbox.innerHTML = "";

  chat.forEach((message) => {
    let child = document.createElement('p')
    child.innerHTML = message.name + ": " + message.message;
    chatbox.appendChild(child);
  })

  chatbox.scrollTop = chatbox.scrollHeight;
}

window.onload = function() {
  // counter logic
  let count = localStorage.getItem('counter')
  if (count == null) {
    localStorage.setItem('counter', '1');
  } else {
    count++;
    localStorage.setItem('counter', count);
  }
  updateCount();

  // chat???
  let chat = localStorage.getItem('chat')
  if (chat == null) {
    localStorage.setItem('chat', JSON.stringify([]))
  }
  console.log(chat)
  if (chat.length > 0) {
    updateChat();
  }
}

function resetChat() {
    localStorage.setItem('chat', JSON.stringify([]))
    updateChat();
}

function resetCount() {
  localStorage.setItem('counter', '1')
  updateCount();
}

function resetAll() {
  resetCount();
  resetChat();
}