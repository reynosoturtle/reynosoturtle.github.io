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

  let count = document.getElementById('counter').innerHTML;
  countRef.update({ counter: count })

}




// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBjAfxyfDFb5iJEF11uyRg7REun0LMrnpo",
  authDomain: "https://ghpages-d0741.firebaseio.com/",
  databaseURL: "https://ghpages-d0741.firebaseio.com",
  projectId: "ghpages-d0741",
  storageBucket: "ghpages-d0741.appspot.com",
  messagingSenderId: "628106415889",
  appId: "1:628106415889:web:95d44420c93a7975"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var chatRef = firebase.database().ref().child('chat');
var countRef = firebase.database().ref().child('counter');

function updateCount(data) {
  let counter = document.getElementById('counter');
  counter.innerHTML = data;
}

function sendChat() {
  event.preventDefault()

  let messageInput = document.getElementById('message').value;
  let nameInput = document.getElementById('name').value;
  let chatbox = document.getElementById('chatbox');

  let obj = { name: nameInput, message: messageInput }
  console.log("obj", obj)
  chatRef.push().set({name: nameInput, message: messageInput})

  updateChat();
}

function updateChat() {

  let chatbox = document.getElementById('chatbox');
  chatbox.innerHTML = "";

  chatRef.on('value', function(snapshot) {
    snapshot.forEach((message) => {
      let child = document.createElement('p')
      child.innerHTML = message.val().name + ": " + message.val().message;
      chatbox.appendChild(child);
    })
  })

  chatbox.scrollTop = chatbox.scrollHeight;
}

updateChat();

window.onload = function() {
  // counter logic
  countRef.on('value', function(snapshot) {
    let count = null;
    count = snapshot.val().counter;
    count++;
    updateCount(count);
  });

  // chat???
  let chat = null;

  chatRef.on('value', function(snapshot) {
    chat = snapshot.val();
    console.log("after req chat", chat)
  })
}