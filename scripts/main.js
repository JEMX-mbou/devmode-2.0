document.onload = loaded();

// loaded function.
// Fires on document loaded.
// Used for event listeners.
function loaded() {
  // Start of the datetime clock. (src: datetime.js);
  let dt = new Datetime();
  // Start of background changer. (src: bgchanger.js);
  new BgChanger();

  // Click event for the switch button.
  // Fires the turnSwitch function.
  let switchEl = document.querySelector('div#switch');
  switchEl.addEventListener( 'click', function() { turnSwitch(); });

  // Keydown event for the body element.
  // Now used for closing the overlay.
  // Can be used for other keybinds.
  let bodyEl = document.querySelector('body');
  bodyEl.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
      closeOverlay(e);
      closeEndOverlay(e);
    }
  });

  // Click event on close_overlay class.
  // Used on mutiple elements.
  // Fires closeOverlay function.
  let closeOl = document.querySelectorAll('.close_overlay');
  closeOl.forEach(function( element ) {
    element.addEventListener('click', function( ce ) { closeOverlay( ce ); });
  });

  // Click event on close_overlay class.
  // Used on mutiple elements.
  // Fires closeOverlay function.
  let closeEndOl = document.querySelector('.close_end_overlay');
  closeEndOl.addEventListener('click', function() { closeEndOverlay(); });

  // Click events on timer and alarm buttons.
  // Fires inputHandler function in datetime.js
  // TODO: Can be slightly shortened if selected on class and ID is used as parameter.
  let timerEL = document.querySelector('button#timer'),
      alarmEl = document.querySelector('button#alarm');
  timerEL.addEventListener('click', function() { dt.inputHandler('timer'); });
  alarmEl.addEventListener('click', function() { dt.inputHandler('alarm'); });

  // Input event on time input elements.
  // Fires the timeInputCounter function in datetime.js
  let timeInput = document.querySelectorAll('div#time-input input');
  timeInput.forEach(function(element) {
    element.addEventListener('input', function(element) { dt.timeInputCounter(  ) });
  });

  // Input event on assignment input.
  // Fills the h2 element in the assignment-container.
  // Fires the openAssignment function as wel.
  let assignmentInput = document.querySelector('input#assignment'),
      assignmentTitle = document.querySelector('aside#assignment-container h2');
  assignmentInput.addEventListener('input', function() {
    assignmentTitle.innerHTML = assignmentInput.value;
    openAssignment();
  });

  // Input event on information input.
  // Fills the div.info element in the assignment-container.
  // Fires the openAssignment function as wel.
  let informationInput = document.querySelector('textarea#information'),
      informationContent = document.querySelector('aside#assignment-container div.info');
  informationInput.addEventListener('input', function() {
    informationContent.innerHTML = informationInput.value;
    openAssignment();
  });

  // Click event on assignment input.
  // TODO: sets timer or alarm based on inputs.
  // If assignment input has been used aside element should be open otherwise close.
  let saveButton = document.querySelector('button#save');
  saveButton.addEventListener('click', function(e) {
    let tiEl = document.querySelector('div#time-input'),
        type = tiEl.classList[0],
        taEl = document.querySelector('div#ta-container');

    if (type != 'disabled') taEl.classList.add('active');

    if (type == 'timer') dt.addTimer( timeInput );
    else if (type == 'alarm') dt.addAlarm( timeInput );
    closeOverlay(e, true);
  });
}

// bodyLoaded function
// Used to make "loading" effect.
function bodyLoaded() {
  let bodyEl = document.querySelector('body'),
      loadingEl = document.querySelector('div#loading');

  // If body hasn't got the class loaded.
  if (!bodyEl.classList.contains('loaded')) {

    // Body get a loaded class after 300ms.
    // Loading element won't be displayed after 1s.
    // Timeout functions used to make animations run smoothly.
    setTimeout(function() { bodyEl.classList.add('loaded'); }, 300);
    setTimeout(function() { loadingEl.style.display = 'none'; }, 1000);
  }
}

// turnSwitch function
// Used to make switch animation and open the overlay.
// And close the assignment.
function turnSwitch() {
  let switchEl = document.querySelector('div#switch'),
      assignmentEl = document.querySelector('aside#assignment-container');

  // If switch is "on".
  if (switchEl.classList.contains('on')) {

    switchEl.classList.remove('on');
    switchEl.classList.add('off');

    // Close assignment panel.
    closeAssignment();

  // if switch is "off"
  } else if (switchEl.classList.contains('off')) {

    switchEl.classList.add('on');
    switchEl.classList.remove('off');

    // Open overlay for Devmode options.
    setTimeout(function() { openOverlay(); }, 500);

    // TODO: if assignment input is filled. Open assignment panel.
  }
}

// openAssignment function.
// Opens assignment panel.
function openAssignment() {
  let assignmentEl = document.querySelector('aside#assignment-container');
  assignmentEl.classList.add('visible');
}

// closeAssignment function.
// Closes assignment panel.
function closeAssignment() {
  let assignmentEl = document.querySelector('aside#assignment-container');
  assignmentEl.classList.remove('visible');
}

// openOverlay function.
// Opens overlay modal.
function openOverlay() {
  let overlayEl = document.querySelector('div#overlay');
  overlayEl.classList.add('active');
}

// closeOverlay function.
// Closes overlay modal.
// @param e = event object.
function closeOverlay( e, ignore = false ) {
  let overlayEl = document.querySelector('div#overlay');
  if ( e.type == 'keydown' || e.target.classList.contains('close_overlay') || ignore ) {
    overlayEl.classList.remove('active');
  }
}

// openOverlay function.
// Opens overlay modal and plays a gong sound.
function openEndOverlay() {
  let endOverlayEl = document.querySelector('div#end-devmode'),
      audio = new Audio('sounds/gong.mp3');

  audio.play();

  endOverlayEl.style.display = 'flex';
  setTimeout(function() {
      endOverlayEl.classList.add('visible');
  }, 10);
}

// closeEndOverlay function.
// Closes overlay modal.
// @param e = event object.
function closeEndOverlay() {
  let endOverlayEl = document.querySelector('div#end-devmode');
  endOverlayEl.classList.remove('visible');
  setTimeout(function() {
      endOverlayEl.style.display = 'none';
  }, 3000);
}
