const expect = require('chai').expect;
const { handleStartEvent, handleEndEvent, handleEndStream } = require('../js/layoutday');
const { testData, testParsed, testResults } = require('./testData');

describe('handleStartEvent handleEndEvent Tests', () => {

  var activeEventCount = 0;
  var activeColumns = {};
  var columnsInStream = 0;
  var eventsInStream = {};


  testParsed.forEach((e, i) => {
    // console.log(e, i);
    const r = testResults[i];

    it(`handleEvent ${i}, eventType: ${e.eventType}`, () => {

      if (e.eventType === 'start') {

        ({ activeEventCount, columnsInStream } = handleStartEvent({
          activeEventCount, activeColumns, columnsInStream, eventsInStream, eventId: e.id }));

      } else {  

        ({ activeEventCount, columnsInStream } = handleEndEvent({
          activeEventCount, activeColumns, columnsInStream, index: eventsInStream[e.id] }));
      }

      // console.log(activeEventCount, columnsInStream, activeColumns);

      expect(activeEventCount).to.equal(r.activeEventCount);
      expect(columnsInStream).to.equal(r.columnsInStream);
      expect(activeColumns[r.columnIndex]).to.equal(r.columnVal);
      expect(eventsInStream[e.id]).to.equal(r.columnIndex);

    });
  });

  it('handleEndStream', () => {
    const cloned = testData.map(event => Object.assign({}, event));
    const columnCheck = columnsInStream;

    columnsInStream = handleEndStream({ activeEventCount, activeColumns, columnsInStream,
      eventsInStream, events: cloned });

    expect(columnsInStream).to.equal(0);

    cloned.forEach(event => {
      expect(event.columns).to.equal(columnCheck);
    });
  });

});
