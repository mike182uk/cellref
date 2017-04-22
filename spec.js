'use strict'

/* globals describe, it */

const should = require('should')
const cellref = require('./index')

describe('cellref', () => {
  it('should convert A1 notation to R1C1 notation', () => {
    cellref.toR1C1('A1').should.be.exactly('R1C1')
    cellref.toR1C1('BU59').should.be.exactly('R59C73')
    cellref.toR1C1('Z1').should.be.exactly('R1C26')
  })

  it('should convert R1C1 notation to A1 notation', () => {
    cellref.toA1('R1C1').should.be.exactly('A1')
    cellref.toA1('R59C73').should.be.exactly('BU59')
    cellref.toA1('R1C26').should.be.exactly('Z1')
  })

  it('should auto detect the notation used and convert to the opposite notation', () => {
    cellref('R1C1').should.be.exactly('A1')
    cellref('BU59').should.be.exactly('R59C73')
    cellref('R1C26').should.be.exactly('Z1')
  })

  it('should throw an error if the R1C1 cell reference is invalid', () => {
    should.throws(() => {
      cellref.toA1('InvalidCellRef')
    }, Error)
  })

  it('should throw an error if the R1C1 cell reference has a row number of zero', () => {
    should.throws(() => {
      cellref.toA1('R0C1')
    }, Error)
  })

  it('should throw an error if the R1C1 cell reference has a column number of zero', () => {
    should.throws(() => {
      cellref.toA1('R1C0')
    }, Error)
  })

  it('should throw an error if the A1 cell reference is invalid', () => {
    should.throws(() => {
      cellref.toR1C1('InvalidCellRef')
    }, Error)
  })

  it('should throw an error if it cannot auto detect the notation used', () => {
    should.throws(() => {
      cellref('InvalidCellRef')
    }, Error)
  })
})
