document.onload = loaded();

function loaded() {
  // Start of the datetime clock.
  let dt = new Datetime();
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

  let timerEL = document.querySelector('button#timer'),
      alarmEl = document.querySelector('button#alarm');
  timerEL.addEventListener('click', function() { dt.inputHandler('timer'); });
  alarmEl.addEventListener('click', function() { dt.inputHandler('alarm'); });

  let timeInput = document.querySelectorAll('div#time-input input');
  timeInput.forEach(function(element) {
    element.addEventListener('input', function(element) { dt.timeInputCounter(  ) });
  });

  let assignmentInput = document.querySelector('input#assignment'),
      assignmentEl = document.querySelector('aside#assignment-container'),
      assignmentTitle = assignmentEl.querySelector('h2');
  assignmentInput.addEventListener('input', function() {
    assignmentTitle.innerHTML = assignmentInput.value;
    if (!assignmentEl.classList.contains('visible')) assignmentEl.classList.add('visible');
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
  let switchEl = document.querySelector('div#switch'),
      assignmentEl = document.querySelector('aside#assignment-container');

  if (switchEl.classList.contains('on')) {
    switchEl.classList.remove('on');
    switchEl.classList.add('off');
    assignmentEl.classList.remove('visible');
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
