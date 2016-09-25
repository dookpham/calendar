const expect = require('chai').expect;
const { handleStartEvent, handleEndStream } = require('../js/layoutday');
const { testData, testParsed, testResults } = require('./testData');

describe('handleStartEvent Tests', () => {
  let activeEventCount = 0;
  let columnsInStream = 0;
  const activeColumns = {};
  const eventsInStream = {};


  testParsed.forEach((e, i) => {
    // console.log(e, i);
    const r = testResults[i];

    it(`handleEvent ${i}, eventType: ${e.eventType}`, () => {
      if (e.eventType === 'start') {
        const { newColumnsInStream, nextColumn } = handleStartEvent({
          activeEventCount, activeColumns, columnsInStream });

        activeEventCount += 1;
        columnsInStream += newColumnsInStream;
        activeColumns[nextColumn] = e.id;
        eventsInStream[e.id] = nextColumn;
      } else {
        const eventId = eventsInStream[e.id];
        delete activeColumns[eventId];
        activeEventCount -= 1;
      }

      // console.log(activeEventCount, columnsInStream, activeColumns);
      expect(activeEventCount).to.equal(r.activeEventCount);
      expect(columnsInStream).to.equal(r.columnsInStream);
      expect(activeColumns[r.columnIndex]).to.equal(r.columnVal);
      expect(eventsInStream[e.id]).to.equal(r.columnIndex);
    });
  });

  // it('handleEndStream', () => {
  //   const cloned = testData.map(event => Object.assign({}, event));
  //   const columnCheck = columnsInStream;

  //   columnsInStream = handleEndStream({ activeEventCount, activeColumns, columnsInStream,
  //     eventsInStream, events: cloned });

  //   expect(columnsInStream).to.equal(0);

  //   cloned.forEach(event => {
  //     expect(event.columns).to.equal(columnCheck);
  //   });
  // });
});
