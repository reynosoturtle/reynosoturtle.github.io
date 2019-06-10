var page = document.getElementById('page');
var last_pane = page.getElementsByClassName('pane');
last_pane = last_pane[last_pane.length - 1];
var dummy_x = null;

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

  //scrollbar shit
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
// Adjust the body height if the window resizes.
window.onresize = resize;
resize();

// Reset window-based vars
function resize() {
  var w = page.scrollWidth - window.innerWidth + window.innerHeight;
  document.body.style.height = w + 'px';

  dummy_x = last_pane.getBoundingClientRect().left + window.scrollY;
}

window.onbeforeunload = function() {
  window.scrollTo(2, 2);

  let count = document.getElementsByClassName('counter')[0].innerHTML;
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
  let counter = document.getElementsByClassName('counter');
  for (let child of counter) {
    child.innerHTML = data;
  }
}

function sendChat() {
  event.preventDefault()

  let messageInput = document.getElementById('message').value;
  let nameInput = document.getElementById('name').value;
  let chatbox = document.getElementById('chatbox');

  let obj = { name: nameInput, message: messageInput }
  console.log("obj", obj)
  chatRef.push().set({ name: nameInput, message: messageInput })

  updateChat();
}

function updateChat() {

  let chatbox = document.getElementById('chatbox');
  chatbox.innerHTML = "";

  chatRef.on('value', function(snapshot) {
    snapshot.forEach((message) => {
      let child = document.createElement('div')
      child.innerHTML = "<div class='messageBorder'><span>" + message.val().name + ":</span> <span>" + message.val().message + "</span></div>";
      chatbox.appendChild(child);
      chatbox.scrollTop = chatbox.scrollHeight;
    })
  })

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


  // typeWriter();
}

//TYPING SHIT

// List of sentences
var _CONTENT = [
  'I hate working alone,',
  'I haven’t made my best work yet,',
  'I’m just lonely,',
  'If you think I do good sh*t,',
  'If you have too much money,',
  'If you think I’m cute,'
];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.getElementById("typing");

// Cursor element
var _CURSOR = document.getElementById("typeCursor");

// Implements typing effect
function Type() {
  // Get substring with 1 characater added
  var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if(text === _CONTENT[_PART]) {
    // Hide the cursor
    // _CURSOR.style.display = 'none';

    clearInterval(_INTERVAL_VAL);
    setTimeout(function() {
      _INTERVAL_VAL = setInterval(Delete, 50);
    }, 1000);
  }
}

// Implements deleting effect
function Delete() {
  // Get substring with 1 characater deleted
  var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX--;

  // If sentence has been deleted then start to display the next sentence
  if(text === '') {
    clearInterval(_INTERVAL_VAL);

    // If current sentence was last then display the first one, else move to the next
    if(_PART == (_CONTENT.length - 1))
      _PART = 0;
    else
      _PART++;

    _PART_INDEX = 0;

    // Start to display the next sentence after some time
    setTimeout(function() {
      // _CURSOR.style.display = 'inline-block';
      _INTERVAL_VAL = setInterval(Type, 100);
    }, 200);
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);