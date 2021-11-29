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

    // Update dateTime Obj with updateTime method
    this.updateTime();

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

  // setDateEl method
  // @param Obj date
  // Sets the HTML date elements.
  setDateEl( date )
  {
    // Dayname and month name formatted in Obj
    let dayArr = { 0: 'Zondag', 1: 'Maandag', 2: 'Dinsdag', 3: 'Woensdag', 4: 'Donderdag', 5: 'Vrijdag', 6: 'Zaterdag' },
        monthArr = { 0: 'Januari', 1: 'Februari', 2: 'Maart', 3: 'April', 4: 'Mei', 5: 'Juni', 6: 'Juli', 7: 'Augustus', 8: 'September', 9: 'Oktober', 10: 'November', 11: 'December' };

    // Sets innerHTML of date elements
    document.querySelector('span#week').innerHTML = this.spaceSplit('Week '+date.w);
    document.querySelector('span#date').innerHTML = this.spaceSplit(date.d+' '+monthArr[date.m]);
    document.querySelector('span#day').innerHTML = this.spaceSplit(dayArr[date.wd]);
    document.querySelector('span#year').innerHTML = this.spaceSplit(date.y.toString());
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
  setTimeEl( key, val )
  {
    // Setting value with leading zero
    let _v = ( val < 10 ? '0'+val : val);

    // Changing innerHTML of time element
    document.querySelector('span#'+key).innerHTML = _v;
  }

  // updateTime method
  // Interval of 1 second
  // Updates seconds, minutes and hours in that order.
  updateTime()
  {
    // _t is the dateTime JSON
    // obj refers to the DateTime class
    let _t = this.dateTime.time,
        obj = this;

    setInterval( function() {
      // Adds an increment to the second counter.
      _t.s++;
      obj.setTimeEl('second', _t.s);

      // If seconds exceed 59 seconds it resets to 0
      // And an increment is added to minute counter.
      if ( _t.s > 59 ) {
        _t.s = 0;
        _t.m++;

        obj.setTimeEl('second', _t.s);
        obj.setTimeEl('minute', _t.m);
      }

      // If minutes exceed 59 seconds it resets to 0
      // And an increment is added to hour counter.
      if ( _t.m > 59 ) {
        _t.m = 0;
        _t.h++;

        obj.setTimeEl('minute', _t.m);
        obj.setTimeEl('hour', _t.h);
      }

      // If hours exceed 23 seconds it resets to 0
      if ( _t.h > 23 ) {
        _t.h = 0;

        obj.setTimeEl('hour', _t.h);
        obj.getDateTime();
      }
    }, 1000);
  }
}
