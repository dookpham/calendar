var _ = require('./lodash');

var testData = [ 
  {
    start: 560, 
    end: 620
  }, 
  {
    start: 540, 
    end: 600
  }, 
  {
    start: 30, 
    end: 150
  }, 
  {
    start: 20, 
    end: 700
  }, 
  {
    start: 620, 
    end: 670
  }
];

/**
* Given an array of events, determine the positioning of events without 
* overlapping and render.
* 
* @param {Object Array} events An array of objects with this shape 
*   [{start: 30, end: 150}, {start: 540, end: 600} ]
*/
function layOutDay(events) {
  
  //deepClone events to prevent mutation of input array
  var cloned = _.cloneDeep(events)

  //
  var parsed = [];
  events.forEach(function(event, i) {
    parsed.push({id: i, etype: 'start', time: event.start})
    parsed.push({id: i, etype: 'end', time: event.end})
  });

  //sort from earliest to latest, start events come before end events for proper column counting
  parsed = parsed.sort(function(a,b) { 
    if (a.time === b.time && a.etype !== b.etype) {
      return b.etype === 'start';
    }
    return a.time - b.time 
  });

  var numColumns = 0;
  parsed.forEach(function(event) {
    
  });

  //sort events by end time from earliest to latest
  // cloned = cloned.sort(function(a,b) { return a.end - b.end });

  // cloned.forEach(function(event) {

  // })

  //[[1][2][1,2]]

  console.log(parsed);
}

layOutDay(testData);
