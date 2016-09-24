var expect = require('chai').expect;
var { assignColumn, removeColumn } = require('../js/layoutday');

describe('assignColumn, removeColumn Tests', function() {

  it('retrieves the next available column on init', function() {

    var columnsInUse = {};
    var activeEventCount = 0;
    var columnCount = 0;
    var nextColumn;

    ({ activeEventCount, columnCount, columnsInUse, nextColumn } = assignColumn({ 
      activeEventCount, columnCount, columnsInUse, id: 0 }));
    // console.log(activeEventCount, columnCount, nextColumn );
    expect(activeEventCount).to.equal(1);
    expect(columnCount).to.equal(1);
    expect(nextColumn).to.equal(0);

    ({ activeEventCount, columnCount, columnsInUse, nextColumn } = assignColumn({ 
      activeEventCount, columnCount, columnsInUse, id: 1 }));
    // console.log(activeEventCount, columnCount, nextColumn );
    expect(activeEventCount).to.equal(2);
    expect(columnCount).to.equal(2);
    expect(nextColumn).to.equal(1);

  });

  it('removes inner column and columns property remains the same', function() {

    var columnsInUse = { 0:3, 1:2, 2:0, 3:1 };
    removeColumn(columnsInUse, 0);
    expect(columnsInUse.columns).to.equal(4);

    removeColumn(columnsInUse, 2);
    expect(columnsInUse.columns).to.equal(4);
  });

  xit('removes end column and columns updates', function() {

    var columnsInUse = { 1:2, 3:1, columns: 4}
    removeColumn(columnsInUse, 3);
    expect(columnsInUse.columns).to.equal(2);
    console.log(columnsInUse);

  });


  xit('retrieves the next available column after removal', function() {
    
    var columnsInUse = { 1:2, columns: 2}
    nextColumn = assignColumn(columnsInUse, 4);
    expect(nextColumn).to.equal(0);
    expect(columnsInUse.columns).to.equal(2);

    nextColumn = assignColumn(columnsInUse, 5);
    expect(nextColumn).to.equal(2);
    expect(columnsInUse.columns).to.equal(3);

    nextColumn = assignColumn(columnsInUse, 6);
    expect(nextColumn).to.equal(3);
    expect(columnsInUse.columns).to.equal(4);

    nextColumn = assignColumn(columnsInUse, 7);
    expect(nextColumn).to.equal(4);
    expect(columnsInUse.columns).to.equal(5);

  });

  xit('removes multiple end column and columns updates', function() {

    var columnsInUse = { 0:2, 1:3, 2:1, 3:4, columns:4}
    removeColumn(columnsInUse, 3);
    expect(columnsInUse.columns).to.equal(3);

    removeColumn(columnsInUse, 2);
    expect(columnsInUse.columns).to.equal(2);

    removeColumn(columnsInUse, 1);
    expect(columnsInUse.columns).to.equal(1);

  });

});
