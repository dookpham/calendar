var expect = require('chai').expect;
var { assignColumn, removeColumn } = require('../js/layoutday');

describe('assignColumn, removeColumn Tests', function() {

  it('retrieves the next available column on init', function() {

    var columnsInUse = { columns: 0 }
    var nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(0);
    expect(columnsInUse.columns).to.equal(1);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(1);
    expect(columnsInUse.columns).to.equal(2);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(2);
    expect(columnsInUse.columns).to.equal(3);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(3);
    expect(columnsInUse.columns).to.equal(4);

  });

  it('removes inner column and columns property remains the same', function() {

    var columnsInUse = { 0:true, 1:true, 2:true, 3:true, columns: 4}
    removeColumn(columnsInUse, 0);
    expect(columnsInUse.columns).to.equal(4);

    removeColumn(columnsInUse, 2);
    expect(columnsInUse.columns).to.equal(4);

  });

  it('removes end column and columns updates', function() {

    var columnsInUse = { 1:true, 3:true, columns: 4}
    removeColumn(columnsInUse, 3);
    expect(columnsInUse.columns).to.equal(2);

  });

  it('retrieves the next available column after removal', function() {
    
    var columnsInUse = { 1:true, columns: 2}
    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(0);
    expect(columnsInUse.columns).to.equal(2);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(2);
    expect(columnsInUse.columns).to.equal(3);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(3);
    expect(columnsInUse.columns).to.equal(4);

    nextColumn = assignColumn(columnsInUse);
    expect(nextColumn).to.equal(4);
    expect(columnsInUse.columns).to.equal(5);

  });
});
