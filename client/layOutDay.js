import $ from 'jquery';

/**
* Parses the events into separate 'start' and 'end' events and sorts them.
* sort from earliest to latest, 'end' events must come before 'start' events to
* find the end of a continuous group of events (i.e. stream).
* sorting gives us O(nlogn) time and will be the most expensive computation by time
* for layOutDay.
* @param { Array } events An array of objects with a start and end property
* @return { Array } cloned A deepCopy of events
* @return  { Array } parsed An array of start or end objects
*/
export function cloneAndParseEvents(events) {
  const parsed = [];
  const cloned = events.map((event, i) => {
    parsed.push({ id: i, eventType: 'start', time: event.start });
    parsed.push({ id: i, eventType: 'end', time: event.end });
    return Object.assign({}, event);
  });

  parsed.sort((a, b) => {
    if (a.time === b.time && a.eventType !== b.eventType) {
      return b.eventType === 'end';
    }
    return a.time - b.time;
  });
  return { cloned, parsed };
}

/**
* Determines the nextColumn index for new events.  Also determines if the
* number of newColumnsInStream has increased.
* @param { number } activeEventCount The number of active events
* @param { Object } activeColumns Key/value pairs indicating columnIndex/eventId
* @param { number } columnsInStream The number of columns in the current stream
* @return {number} newColumnsInStream The number of columns added to the stream (1 or 0)
* @return {number} nextColumn The next columnIndex to assign the next event to
*/
export function handleStartEvent({ activeEventCount, activeColumns, columnsInStream }) {
  let nextColumn = 0;
  let newColumnsInStream = 0;

  // columns are all full, add one more to the end
  if (activeEventCount + 1 > columnsInStream) {
    newColumnsInStream = 1;
    nextColumn = activeEventCount;  // not +1 because columns are zero-indexed

  // find a 'gap' in the columns
  } else {
    while (typeof activeColumns[nextColumn] === 'number') {
      nextColumn += 1;
    }
  }
  return { newColumnsInStream, nextColumn };
}

/**
* Given an array of events, assigns a columnIndex and number of columns for each event.
* @param { Array } events An array of objects with a start and end property
* @return { Array } cloned A deepCopy of events with columns and columnIndex properties
*/
export function getColumnValues(events) {
  let activeEventCount = 0;
  let columnsInStream = 0;
  const activeColumns = {};
  const eventsInStream = {};
  const { cloned, parsed } = cloneAndParseEvents(events);

  parsed.forEach((e) => {
    // @'start' events...
    if (e.eventType === 'start') {
      const { newColumnsInStream, nextColumn } = handleStartEvent({
        activeEventCount, activeColumns, columnsInStream });

      activeEventCount += 1;
      columnsInStream += newColumnsInStream;
      activeColumns[nextColumn] = e.id;
      eventsInStream[e.id] = nextColumn;

    // @'end' events...
    } else {
      const eventId = eventsInStream[e.id];
      delete activeColumns[eventId];
      activeEventCount -= 1;

      // end the event stream and assign columns and columnIndex
      if (activeEventCount === 0) {
        Object.keys(eventsInStream).forEach((id) => {
          cloned[id].columns = columnsInStream;
          cloned[id].columnIndex = eventsInStream[id];
          delete eventsInStream[id];
        });
        columnsInStream = 0;
      }
    }
  });
  return cloned;
}

/**
* Assigns top, height, left, width properties based
* on columns and columnIndex values.
* @param { Array } events An array of objects with columns and columnIndex properties
* @return { Array } cloned A deepCopy of events with additional position properties
*/
function assignPositionValues(events) {
  const sideOffset = 10;
  const eventContainerWidth = 620 - (sideOffset * 2);
  const eventPadding = 10;

  const cloned = events.map((e) => {
    const width = (eventContainerWidth / e.columns) - (eventPadding * 2);
    return Object.assign({
      top: e.start,
      height: e.end - e.start - 2,
      left: 10 + ((width + (eventPadding * 2)) * e.columnIndex),
      width,
    }, e);
  });
  return cloned;
}

/**
* Renders events to the DOM
* @param { Array } events An array of objects with left, width, top, height properties
*/
function renderEvents(events) {
  const eventContainer = $('.event-container');
  eventContainer.empty();  // remove previous events

  events.forEach((event) => {
    const eventElement = $('<div>').addClass('event').css({
      left: `${event.left}px`,
      width: `${event.width}px`,
      top: `${event.top}px`,
      height: `${event.height}px`,
    });
    eventElement.append('<b class="event-label">Sample Item</b>');
    if (event.height > 30) { eventElement.append('<p class="location-label">Sample Location</p>'); }
    eventElement.appendTo(eventContainer);
  });
  return true;
}

/**
* Given an array of events, determine the positioning and size of events
* in calendar view without overlapping and render.
* @param { Array } events An array of objects with a start and end property
*/
export default function layOutDay(events) {
  const hasColumnValues = getColumnValues(events);
  const hasPositionValues = assignPositionValues(hasColumnValues);
  renderEvents(hasPositionValues);
  return true;
}

/**
* Generates a random-ish array of events with a start and end property
* @param { number } numEvents The number of events to generate
* @param { number } maxEventTime The maximum length of time for an event
* @param { number } minEventTime The minimum length of time for an event
* @return { Array } testData An array of objects with a start and end property
*/
export function generateRandomEvents(numEvents, maxEventTime, minEventTime) {
  const testData = [];

  for (let i = 0; i < numEvents; i += 1) {
    const start = Math.floor(Math.random() * 650);
    const maxTime = Math.min(700, start + maxEventTime);
    let end = Math.floor((Math.random() * (maxTime - start)) + (start + 1));
    end = Math.max(end, start + minEventTime);
    testData.push({ start, end });
  }

  return testData;
}
