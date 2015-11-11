var should = require('should');

var cellref = require('./index');

describe('cellref', function () {
  it('should convert A1 notation to R1C1 notation', function () {
    cellref.toR1C1('A1').should.be.exactly('R1C1');
    cellref.toR1C1('BU59').should.be.exactly('R59C73');
  });

  it('should convert R1C1 notation to A1 notation', function () {
    cellref.toA1('R1C1').should.be.exactly('A1');
    cellref.toA1('R59C73').should.be.exactly('BU59');
  });

  it('should auto detect the notation used and convert to the opposite notation', function () {
    cellref('R1C1').should.be.exactly('A1');
    cellref('BU59').should.be.exactly('R59C73');
  });
});
