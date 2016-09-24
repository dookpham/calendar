// var _ = require('./lodash');

/**
* Given an array of events, determine the positioning and size of events 
* in calendar view without overlapping and render.
* 
* @param {Object Array} events An array of objects with this shape 
*   [{start: 30, end: 150}, {start: 540, end: 600} ]
*/
function layOutDay(events) {
  
  //deepClone events to prevent mutation of input array
  // var cloned = _.cloneDeep(events);

  //
  

  //sort events by end time from earliest to latest
  // cloned = cloned.sort(function(a,b) { return a.end - b.end });

  // cloned.forEach(function(event) {

  // })

  //[[1][2][1,2]]

  console.log(parsed);
  console.log(cloned);
  return cloned;
}


/**
* Given an array of objects, return a corresponding array that indicates the 
* number of columns and the columnIndex at each event,
*
* @param {Object Array} events An array of objects with this shape:
*   [{}]
*/
function getColumnValues(events) {

  // var cloned = [];
  var parsed = [];
  var cloned = events.map(function(event, i) {
    parsed.push({id: i, etype: 'start', time: event.start});
    parsed.push({id: i, etype: 'end', time: event.end});
    // cloned.push({id: i, columns: 1})
    return { start: event.start, end: event.end, columns:1 }
  });

  //sort from earliest to latest, 'end' events come before 'start' events for proper column counting
  parsed = parsed.sort(function(a,b) { 
    if (a.time === b.time && a.etype !== b.etype) {
      return b.etype === 'end';
    }
    return a.time - b.time 
  });

  var columnsInUse = { columns: 0 };

  var manageEvent = {
    start: handleStartEvent,
    // start: function(id) {
    //   var columnValue = cloned[id];
    //   columnValue.columnIndex = assignColumn(columnsInUse, id);
    //   // columnValue.columns = Math.max(columnValue.columns, columnsInUse.columns);
    //   for (k in columnsInUse) {
    //     var id = columnsInUse[k];
    //     if (cloned[id]) {
    //       cloned[id].columns = Math.max(cloned[id].columns, columnsInUse.columns);

    //     }
    //   }
    // },

    end: function(id) {
      var columnIndex = cloned[id].columnIndex;
      removeColumn(columnsInUse, columnIndex);
    }
  }

  parsed.forEach(function(event) {
    manageEvent[event.etype](event.id);
  });

  return cloned;
}

/**
* activeEventCount vs. columnCount
*   columnCount may increase as events are added but only resets to zero when all ongoing
*   events end.
*   activeEventCount increases and decreases as events start and end.
*/
function handleStartEvent({ activeEventCount, activeColumns, columnsInStream, 
  eventsInStream, eventId }) {

  var nextColumn = 0;
  activeEventCount++;

  // columns are all full, add one more to the end
  if (activeEventCount > columnsInStream) {
    columnsInStream = activeEventCount;
    nextColumn = activeEventCount - 1;  // -1 because columns are zero-indexed

  // find a 'gap' in the columns 
  } else {
    while ( typeof activeColumns[nextColumn] === 'number' ) {
      nextColumn++;
    }
  }
  
  activeColumns[nextColumn] = eventId;
  eventsInStream[eventId] = nextColumn;

  return { activeEventCount, columnsInStream };
}



function handleEndEvent({ activeEventCount, activeColumns, columnsInStream,  
  index }) {

  if ( activeColumns[index] === undefined ) { 
    return false 
  }

  delete activeColumns[index];
  activeEventCount--;

  return { activeEventCount, columnsInStream };
}


/** Assign columnsInStream to all in eventsInStream
*   Clear columnsInStream = 0, activeColumns, eventsInStream
*/
function handleEndStream({ activeEventCount, activeColumns, columnsInStream,
  eventsInStream, events }) {

  if ( activeEventCount !== 0 ) { throw( 'Cannot end stream with activeEvents' ); }
  if ( Object.keys(activeColumns).length !== 0 ) { throw( 'Cannot end stream with activeColumns')};

  for ( id in eventsInStream ) {
    events[id].columns = columnsInStream;
    events[id].columnIndex = eventsInStream[id];
  }

  return 0;
}

/**
*
*/
// function assignColumn({ activeEventCount, columnsInStream, activeColumns, id }) {
//   var nextColumn = 0;
//   activeEventCount++;

//   // columns are all full, add one more to the end
//   if (activeEventCount > columnsInStream) {
//     columnsInStream = activeEventCount;
//     nextColumn = activeEventCount - 1;  // -1 because columns are zero-indexed

//   // find a 'gap' in the columns 
//   } else {
//     while ( typeof activeColumns[nextColumn] === 'number' ) {
//       nextColumn++;
//     }
//   }
//   activeColumns[nextColumn] = id;

//   return { activeEventCount, columnsInStream, nextColumn };
// }


module.exports = {
  layOutDay,
  getColumnValues,
  handleStartEvent,
  handleEndEvent,
  handleEndStream,
}
