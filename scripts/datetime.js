class Datetime {

  // constructor method
  // Initializes the object.
  constructor(){
    // Set dateTime variable
    this.getDateTime();

    // Fill date and time HTML elements.
    this.setTimeEl( 'hour', this.dateTime.time.h );
    this.setTimeEl( 'minute', this.dateTime.time.m );
    this.setTimeEl( 'second', this.dateTime.time.s );

    // Ticker method is fired and will fire every second.
    this.ticker();

    this.setDateEl( this.dateTime.date );
  }

  // getDate method
  // returns Obj of current date.
  getDateTime()
  {
    let _m = moment();

    // return formatted Obj of moment Obj
    this.dateTime = {
            'date':
              {
                'wd': _m.day(),
                'd': _m.date(),
                'w': _m.week(),
                'm': _m.month(),
                'y': _m.year()
              },
            'time':
              {
                'h': _m.hour(),
                'm': _m.minute(),
                's': _m.second()
              }
            };
  }

  setDateTime(val, dt, key) {
    this.dateTime[dt][key] = val;
  }

  // setDateEl method
  // @param Obj date
  // Sets the HTML date elements.
  setDateEl( date )
  {
    // Dayname and month name formatted in Obj
    let dayArr = { 0: 'Zondag', 1: 'Maandag', 2: 'Dinsdag', 3: 'Woensdag', 4: 'Donderdag', 5: 'Vrijdag', 6: 'Zaterdag' },
        monthArr = { 0: 'Januari', 1: 'Februari', 2: 'Maart', 3: 'April', 4: 'Mei', 5: 'Juni', 6: 'Juli', 7: 'Augustus', 8: 'September', 9: 'Oktober', 10: 'November', 11: 'December' };

    // Sets innerHTML of date elements
    document.querySelector('span#week').innerHTML = 'Week '+date.w;
    document.querySelector('span#date').innerHTML = date.d+' '+monthArr[date.m];
    document.querySelector('span#day').innerHTML = dayArr[date.wd];
    document.querySelector('span#year').innerHTML = date.y.toString();
  }

  // spaceSplit method
  // @param string string
  // Splits a string and puts every character in an element.
  spaceSplit( str )  {
    let sArr = str.split(''),
        rStr = '';

    // Foreach loop through all characters and add i elements.
    sArr.forEach( function(char) {
      rStr += '<i>'+char+'</i>';
    });

    return rStr;
  }

  // setTimeEl method
  // @param Obj time
  // Sets the HTML time elements.
  setTimeEl( key, val, input = false ) {
    // Setting value with leading zero
    let _v = ( val < 10 ? '0'+val : val);

    // Changing innerHTML of time element
    if (!input) {
      document.querySelector('span#'+key).innerHTML = _v;
    } else {
      let inpEl = document.querySelector('input#'+key);
      inpEl.value = _v;
      inpEl.removeAttribute('disabled');
    }
  }

  // ticker method
  // Interval of 1 second
  // Updates seconds, minutes and hours in that order.
  ticker() {
    // obj refers to the DateTime class
    let obj = this;

    setInterval( function() {

      // updateTime function is executed;
      obj.updateTime();

      // updateTimer function is executed
      obj.updateTimer();

      // updateAlarm function is executed
      obj.updateAlarm();

    }, 1000);
  }

  updateTime() {
    let _t = this.dateTime.time;

    _t.s++;

    if (_t.s > 59) {
      _t.s = 0;
      _t.m++;
    }

    if (_t.m > 59) {
      _t.m = 0;
      _t.h++;
    }

    if (_t.h > 23) {
      _t.h = 0;
    }

    this.setDateTime(_t.h, 'time', 'h');
    this.setDateTime(_t.m, 'time', 'm');
    this.setDateTime(_t.s, 'time', 's');

    this.setTimeEl('hour', _t.h );
    this.setTimeEl('minute', _t.m );
    this.setTimeEl('second', _t.s );
  }

  inputHandler( type ) {
    let tiEl = document.querySelector('div#time-input'),
        bEl = document.querySelector('button#'+type);

    tiEl.classList.add(type);
    tiEl.classList.remove('disabled');
    bEl.classList.add('active');

    if (type == 'timer') {
      tiEl.classList.remove('alarm');
      document.querySelector('button#alarm').classList.remove('active');

      this.setTimeEl( 'hour', 0, true );
      this.setTimeEl( 'minute', 0, true );
    } else if (type == 'alarm') {
      tiEl.classList.remove('timer');
      document.querySelector('button#timer').classList.remove('active');

      this.setTimeEl( 'hour', this.dateTime.time.h, true );
      this.setTimeEl( 'minute', this.dateTime.time.m, true );
    }
  }

  timeInputCounter() {
    let hourEl = document.querySelector('input#hour'),
        hours = parseInt(hourEl.value),
        minEl = document.querySelector('input#minute'),
        minutes = parseInt(minEl.value);

    if (minutes > 59 && hours < 23) {
      hours++;
      minutes = 0;
    } else if (minutes < 0 && hours > 0) {
      hours--;
      minutes = 59;
    }

    hourEl.value = (hours < 10 ? '0' + hours : hours);
    minEl.value = (minutes < 10 ? '0' + minutes : minutes);
  }

  addTimer( timeInput ) {
    let hour = parseInt(timeInput[0].value),
        minute = parseInt(timeInput[1].value),
        seconds = (hour * 3600) + (minute * 60);

    this.dateTime['timer'] = seconds;
    this.dateTime['fullTimer'] = {'h': hour, 'm': minute, 's': 0};
  }

  updateTimer() {
    if ( typeof this.dateTime.timer !== 'undefined' ) {

      let _h = this.dateTime.fullTimer.h,
          _m = this.dateTime.fullTimer.m,
          _s = this.dateTime.fullTimer.s,
          s = this.dateTime.timer;

      if (s > 0) {

        s--;

        if (_s < 1 && _m > 0) {
          _s = 59;
          _m--;
        } else {
          _s--;
        }

        if (_m < 1 && _h > 0) {
          _m = 59;
          _h--;
        }

        this.setTAelement('Timer', _h, _m, _s);

        this.dateTime['timer'] = s;
        this.dateTime['fullTimer'] = {'h': _h, 'm': _m, 's': _s};
      } else {
        delete this.dateTime.timer;
        delete this.dateTime.fullTimer;
        openEndOverlay();
        closeAssignment();
      }
    }
  }

  addAlarm( timeInput ) {
    let hour = parseInt(timeInput[0].value),
        minute = parseInt(timeInput[1].value);

    this.dateTime['alarm'] = { 'h': hour, 'm': minute };
    this.setTAelement('Alarm', hour, minute);
  }

  updateAlarm() {
    if ( typeof this.dateTime.alarm !== 'undefined' ) {
      let _h = this.dateTime.alarm.h,
          _m = this.dateTime.alarm.m,
          h = this.dateTime.time.h,
          m = this.dateTime.time.m;

      if (_h == h && _m == m) {
        delete this.dateTime.alarm;

        openEndOverlay();
      }
    }
  }

  deleteTimerAlarm() {
    delete this.dateTime.timer;
    delete this.dateTime.fullTimer;
    delete this.dateTime.alarm;

    let taEl = document.querySelector('div#ta-container');
    taEl.classList.remove('active');
  }

  setTAelement( type, hour, minute, second = null ) {
    let typeEl = document.querySelector('span.ta-type'),
        hourEl = document.querySelector('span.ta-hour'),
        minuteEl = document.querySelector('span.ta-minute'),
        secondEl = document.querySelector('span.ta-second');

    typeEl.innerHTML = type+': ';
    hourEl.innerHTML = (hour<10?'0'+hour:hour);
    minuteEl.innerHTML = (minute<10?'0'+minute:minute);

    if (second !== null) {
      secondEl.innerHTML = (second<10?'0'+second:second);
      secondEl.classList.remove('hidden');
    } else {
      secondEl.classList.add('hidden');
    }
  }
}
