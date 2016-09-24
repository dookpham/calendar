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


function handleStartEvent(id, events, columnsInUse) {
  var columnValue = events[id];
  columnValue.columnIndex = assignColumn(columnsInUse, id);
  // columnValue.columns = 
  for (const id of columnsInUse) {
    // var id = columnsInUse[k];
    if (events[id]) {
      events[id].columns = Math.max(events[id].columns, columnsInUse.columns);

    }
  }
  return true;
}

/**
* Given an object indicating columns in use, return the next unused column index
* Update the count if the new index is greater that the greatest index so far
* (i.e all other indexes up to the previous greatest index are full)
*
* @param {Object} columnsInUse An object with this shape { 1: true, 3: true, count: 2 }
*/
function assignColumn({ activeEventCount, columnCount, columnsInUse, id }) {
  var nextColumn = 0;
  activeEventCount++;

  // columns are all full, add one more to the end
  if (activeEventCount > columnCount) {
    columnCount = activeEventCount;
    nextColumn = activeEventCount - 1;

  // find a 'gap' in the columns 
  } else {
    
    while ( typeof columnsInUse[nextColumn] === 'number' ) {
      nextColumn++;
    }
  }
  columnsInUse[nextColumn] = id;

  return { activeEventCount, columnCount, columnsInUse, nextColumn };
}


/**
* Given an object indicating columns in use, remove the column at index i
* Update the columns property if the index removed was the greatest column
*
* @param {Object} columnsInUse An object with this shape { 1: true, 3: true, count: 2 }
* @param integer i index to remove column
*/
function removeColumn({ activeEventCount, columnCount, columnsInUse, i }) {
  if ( columnsInUse[i] === undefined ) { return false }

  delete columnsInUse[i];
  activeEventCount--;

  // only reset the columnCount when the calendar is clear of events
  if (activeEventCount === 0) {
    columnCount = 0;
  }

  return { activeEventCount, columnCount, columnsInUse };
}


module.exports = {
  layOutDay,
  getColumnValues,
  handleStartEvent,
  assignColumn,
  removeColumn,
}
