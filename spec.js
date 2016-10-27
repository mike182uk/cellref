var should = require('should');

var cellref = require('./index');

describe('cellref', function () {
  it('should convert A1 notation to R1C1 notation', function () {
    cellref.toR1C1('A1').should.be.exactly('R1C1');
    cellref.toR1C1('BU59').should.be.exactly('R59C73');
    cellref.toR1C1('Z1').should.be.exactly('R1C26');
  });

  it('should convert R1C1 notation to A1 notation', function () {
    cellref.toA1('R1C1').should.be.exactly('A1');
    cellref.toA1('R59C73').should.be.exactly('BU59');
    cellref.toA1('R1C26').should.be.exactly('Z1');
  });

  it('should auto detect the notation used and convert to the opposite notation', function () {
    cellref('R1C1').should.be.exactly('A1');
    cellref('BU59').should.be.exactly('R59C73');
    cellref('R1C26').should.be.exactly('Z1');
  });

  it('should throw an error if the R1C1 cell reference is invalid', function () {
    should.throws(function () {
      cellref.toA1('InvalidCellRef');
    }, Error);
  });

  it('should throw an error if the A1 cell reference is invalid', function () {
    should.throws(function () {
      cellref.toR1C1('InvalidCellRef');
    }, Error);
  });

  it('should throw an error if it cannot auto detect the notation used', function () {
    should.throws(function () {
      cellref('InvalidCellRef');
    }, Error);
  });

  it('should convert A1 notation range to R1C1 notation', function() {
    cellref.toR1C1('A1:A2', true).should.be.exactly('R1C1:R2C1');
    cellref.toR1C1('BU59:BU60', true).should.be.exactly('R59C73:R60C73');
  });

  it('should convert R1C1 notation range to A1 notation', function() {
    cellref.toA1('R1C1:R2C1', true).should.be.exactly('A1:A2');
    cellref.toA1('R59C73:R60C73', true).should.be.exactly('BU59:BU60');
  });

  it('should convert A1 notation range to R1C1 notation', function() {
    cellref.toR1C1Range('A1:A2').should.be.exactly('R1C1:R2C1');
    cellref.toR1C1Range('BU59:BU60').should.be.exactly('R59C73:R60C73');
  });

  it('should convert R1C1 notation range to A1 notation', function() {
    cellref.toA1Range('R1C1:R2C1').should.be.exactly('A1:A2');
    cellref.toA1Range('R59C73:R60C73').should.be.exactly('BU59:BU60');
  });

  it('should auto detect the notation used and convert to the opposite notation (range)', function () {
    cellref('R1C1:R2C1', true).should.be.exactly('A1:A2');
    cellref('BU59:BU60', true).should.be.exactly('R59C73:R60C73');
  });

  it('should auto detect the notation used and convert to the opposite notation (range)', function () {
    cellref.range('R1C1:R2C1').should.be.exactly('A1:A2');
    cellref.range('BU59:BU60').should.be.exactly('R59C73:R60C73');
  });

  it('should throw an error if the R1C1 cell reference is invalid (range)', function () {
    should.throws(function () {
      cellref.toA1('InvalidCellRef:InvalidCellRef', true);
    }, Error);
  });

  it('should throw an error if the R1C1 cell reference is invalid (range, upper)', function () {
    should.throws(function () {
      cellref.toA1('INVALIDCELLREF:INVALIDCELLREF', true);
    }, Error);
  });

  it('should throw an error if the A1 cell reference is invalid (range, R1C1 given)', function () {
    should.throws(function () {
      cellref.toR1C1('R1C1:R1C2', true);
    }, Error);
  });

  it('should throw an error if the R1C1 cell reference is invalid (range, A1 given)', function () {
    should.throws(function () {
      cellref.toA1('A1:A2', true);
    }, Error);
  });

  it('should throw an error if the cell reference types are different', function () {
    should.throws(function () {
      cellref('A1:R1C2', true);
    }, Error);
  });

  it('should throw an error if one of the reference types are invalid', function () {
    should.throws(function () {
      cellref('A1:InvalidCellRef', true);
    }, Error);
    should.throws(function () {
      cellref('InvalidCellRef:A2', true);
    }, Error);
  });

  it('should throw an error if the cell range contains more than one range', function () {
    should.throws(function () {
      cellref('A1:R1C2:R1C2', true);
    }, Error);
  });

  it('should throw an error if the cell range contains more than one range', function () {
    should.throws(function () {
      cellref('A1:R1C2:R1C2', true);
    }, Error);
  });

  it('should throw an error if an invalid range is given', function () {
    should.throws(function () {
      cellref.range('A1:R1C2:R1C2');
    }, Error);
  });

  it('should throw an error if an invalid cell reference is given', function () {
    should.throws(function () {
      cellref.range('A1:INVALIDCELLREF');
    }, Error);
  });

});
