import { expect } from 'chai';
import { getColumnValues } from '../client/layOutDay';

describe('getColumnValues Tests', () => {
  it('assigns the correct columnIndex and columns value', () => {
    const testData = [{ start: 10, end: 700 }, { start: 540, end: 600 },
      { start: 560, end: 620 }, { start: 30, end: 150 }, { start: 610, end: 670 }];

    const columnValues = getColumnValues(testData);
    // console.log(columnValues);
    expect(columnValues[0].columns).to.equal(3);
    expect(columnValues[1].columns).to.equal(3);
    expect(columnValues[2].columns).to.equal(3);
    expect(columnValues[3].columns).to.equal(3);
    expect(columnValues[4].columns).to.equal(3);

    expect(columnValues[0].columnIndex).to.equal(0);
    expect(columnValues[1].columnIndex).to.equal(1);
    expect(columnValues[2].columnIndex).to.equal(2);
    expect(columnValues[3].columnIndex).to.equal(1);
    expect(columnValues[4].columnIndex).to.equal(1);
  });

  it('assigns the correct columnIndex and columns value', () => {
    const testData = [{ start: 540, end: 600 }, { start: 560, end: 620 },
      { start: 30, end: 150 }, { start: 600, end: 670 }];

    const columnValues = getColumnValues(testData);
    expect(columnValues[0].columns).to.equal(2);
    expect(columnValues[1].columns).to.equal(2);
    expect(columnValues[2].columns).to.equal(1);
    expect(columnValues[3].columns).to.equal(2);

    expect(columnValues[0].columnIndex).to.equal(0);
    expect(columnValues[1].columnIndex).to.equal(1);
    expect(columnValues[2].columnIndex).to.equal(0);
    expect(columnValues[3].columnIndex).to.equal(0);
  });
});
