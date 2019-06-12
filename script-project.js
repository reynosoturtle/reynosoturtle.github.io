var page = document.getElementById('page');
var last_pane = page.getElementsByClassName('pane');
last_pane = last_pane[last_pane.length - 1];
var dummy_x = null;

window.onscroll = function() {
  // Horizontal Scroll.
  var y = document.body.getBoundingClientRect().top;
  page.scrollLeft = -y;

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
