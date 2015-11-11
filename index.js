/**
 * R1C1 pattern
 *
 * @type {RegExp}
 */

var R1C1 = /^R(\d+)C(\d+)$/;

/**
 * A1 pattern
 *
 * @type {RegExp}
 */

var A1 = /^([A-Z]+)(\d+)$/;

/**
 * Convert A1 notation to R1C1 notation
 *
 * @param {string} a1Value
 * @returns {string}
 * @throws {Error}
 */

function A1toR1C1(a1Value) {
  if (!A1.test(a1Value)) {
    throw new Error(a1Value + ' is not a valid A1 cell reference');
  }

  var a1Parts = a1Value
    .replace(A1, '$1,$2')
    .split(',');

  var columnStr = a1Parts[0];
  var row = a1Parts[1];
  var column = 0;

  for (var i = 0; i < columnStr.length; i++) {
    column = 26 * column + columnStr.charCodeAt(i) - 64;
  }

  return 'R' + row + 'C' + column;
}

/**
 * Convert R1C1 notation to A1 notation
 *
 * @param {string} r1c1Value
 * @returns {string}
 * @throws {Error}
 */

function R1C1toA1(r1c1Value) {
  if (!R1C1.test(r1c1Value)) {
    throw new Error(r1c1Value + ' is not a valid R1C1 cell reference');
  }

  var r1c1Parts = r1c1Value
    .replace(R1C1, '$1,$2')
    .split(',');

  var row = r1c1Parts[0];
  var column = r1c1Parts[1];
  var columnStr = '';

  for (; column; column = Math.floor(column / 26)) {
    columnStr = String.fromCharCode((column % 26) + 64) + columnStr;
  }

  return columnStr + row;
}

/**
 * Auto detects notation used and converts to the opposite notation
 *
 * @param {string} value
 * @returns {string}
 * @throws {Error}
 */

function cellref(value) {
  if (R1C1.test(value)) {
    return R1C1toA1(value);
  }

  if (A1.test(value)) {
    return A1toR1C1(value);
  }

  throw new Error('could not detect cell reference notation for ' + value);
}

/**
 * Exports
 */

module.exports = cellref;
module.exports.toA1 = R1C1toA1;
module.exports.toR1C1 = A1toR1C1;
