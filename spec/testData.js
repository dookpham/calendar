const testData = [
  {
    start: 560,
    end: 620,
  },
  {
    start: 540,
    end: 600,
  }
];

const testParsed = [ 
  {
    id: 1,
    eventType: 'start',
    time: 540,
  },
  {
    id: 0,
    eventType: 'start',
    time: 560,
  },
  {
    id: 1,
    eventType: 'end',
    time: 600,
  },
  {
    id: 0,
    eventType: 'end',
    time: 620,
  }
];

const testResults = [
  {
    id: 1,
    activeEventCount: 1,
    columnsInStream: 1,
    columnIndex: 0,
    columnVal: 1,
  },
  {
    id: 0,
    activeEventCount: 2,
    columnsInStream: 2,
    columnIndex: 1,
    columnVal: 0,
  },
  {
    id: 1,
    activeEventCount: 1,
    columnsInStream: 2,
    columnIndex: 0,
    columnVal: undefined,
  },
  {
    id: 0,
    activeEventCount: 0,
    columnsInStream: 2,
    columnIndex: 1,
    columnVal: undefined,
  },
];

module.exports = {
  testData,
  testParsed,
  testResults,
}