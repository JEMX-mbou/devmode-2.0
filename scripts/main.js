document.onload = loaded();

function loaded() {
  // Start of the datetime clock.
  new Datetime();
  new BgChanger();

  let switchEl = document.querySelector('div#switch');
  switchEl.addEventListener( 'click', function() { turnSwitch(); });

  let bodyEl = document.querySelector('body');
  bodyEl.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) close_overlay();
  });

  let closeOl = document.querySelectorAll('.close_overlay');
  closeOl.forEach(function(element) {
    element.addEventListener('click', function() { close_overlay(); });
  });
}

function bodyLoaded() {
  let bodyEl = document.querySelector('body'),
      loadingEl = document.querySelector('div#loading');

  if (!bodyEl.classList.contains('loaded')) {
    setTimeout(function() {
      bodyEl.classList.add('loaded');
    }, 300);
    setTimeout(function() {
      loadingEl.style.display = 'none';
    }, 1000);
  }
}

function turnSwitch() {
  let switchEl = document.querySelector('div#switch');

  if (switchEl.classList.contains('on')) {
    switchEl.classList.remove('on');
    switchEl.classList.add('off');
  } else if (switchEl.classList.contains('off')) {
    switchEl.classList.add('on');
    switchEl.classList.remove('off');
    setTimeout(function() {
        open_overlay();
    }, 500);
  }
}

function open_overlay() {
  let overlayEl = document.querySelector('div#overlay');
  overlayEl.classList.add('active');
}

function close_overlay() {
  let overlayEl = document.querySelector('div#overlay');
  overlayEl.classList.remove('active');
}
