document.addEventListener("DOMContentLoaded", loaded);

function loaded() {
  // Start of the datetime clock.
  new Datetime();

  new BgChanger();

  let switchEl = document.querySelector('div#switch');
  switchEl.addEventListener( 'click', function() {
    switchEl.classList.toggle('on');
    switchEl.classList.toggle('off');
  } );
}
