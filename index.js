/**
 * Exports
 */

module.exports = cellref;
module.exports.toA1 = convertR1C1toA1;
module.exports.toR1C1 = convertA1toR1C1;
module.exports.toA1Range = convertRange.bind(null, convertR1C1toA1);
module.exports.toR1C1Range = convertRange.bind(null, convertA1toR1C1);
module.exports.range = convertRange;

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
 * Range pattern
 * @type {RegExp}
 */

var Range = /^([A-Z\d]+)\:([A-Z\d+]+)$/;

/**
 * Auto detect notation used and convert to the opposite notation
 *
 * @param {string} ref
 * @param {boolean} [detectRange]
 * @returns {string}
 * @throws {Error}
 */

function cellref(ref, detectRange) {
  if (detectRange && Range.test(ref)) {
    return convertRange(ref, cellref);
  }

  if (R1C1.test(ref)) {
    return convertR1C1toA1(ref);
  }

  if (A1.test(ref)) {
    return convertA1toR1C1(ref);
  }

  throw new Error('could not detect cell reference notation for ' + ref);
}

/**
 * Get a string representation of the cell reference type
 *
 * @param {string} ref
 * @param {string}
 * @throws {Error}
 */

function getRefType(ref) {
  if (R1C1.test(ref)) {
    return 'R1C1';
  }
  if (A1.test(ref)) {
    return 'A1';
  }

  throw new Error('could not detect cell reference notation for ' + ref);
}

/**
 * Auto detect range notation used and convert to the opposite notation
 *
 * If a converter function is passed it will be used to validate and convert
 * the cell reference
 *
 * @param {string} ref
 * @param {function} [converter]
 * @returns {string}
 * @throws {Error}
 */

function convertRange(ref, converter) {
  // When exporting we use bind to set the convert
  if (ref instanceof Function) {
    var temp = ref;
    ref = converter;
    converter = temp;
  }

  if (!Range.test(ref)) {
    throw new Error(ref + ' is not a valid range reference');
  }

  if (!(converter instanceof Function)) {
    converter = cellref;
  }

  var refParts = ref
    .split(':');

  var typePart1 = getRefType(refParts[0]);
  var typePart2 = getRefType(refParts[1]);

  if (typePart1 !== typePart2) {
    throw new Error('Expected type of of cell reference ' +
      refParts[1] + ' to be ' + typePart1 + ', got ' + typePart2);
  }

  return converter(refParts[0]) + ':' + converter(refParts[1]);
}

/**
 * Convert A1 notation to R1C1 notation
 *
 * @param {string} ref
 * @param {boolean} [detectRange]
 * @returns {string}
 * @throws {Error}
 */

function convertA1toR1C1(ref, detectRange) {
  if (detectRange && Range.test(ref)) {
    return convertRange(ref, convertA1toR1C1);
  }

  if (!A1.test(ref)) {
    throw new Error(ref + ' is not a valid A1 cell reference');
  }

  var refParts = ref
    .replace(A1, '$1,$2')
    .split(',');

  var columnStr = refParts[0];
  var row = refParts[1];
  var column = 0;

  for (var i = 0; i < columnStr.length; i++) {
    column = 26 * column + columnStr.charCodeAt(i) - 64;
  }

  return 'R' + row + 'C' + column;
}

/**
 * Convert R1C1 notation to A1 notation
 *
 * @param {string} ref
 * @param {boolean} [detectRange]
 * @returns {string}
 * @throws {Error}
 */

function convertR1C1toA1(ref, detectRange) {
  if (detectRange && Range.test(ref)) {
    return convertRange(ref, convertR1C1toA1);
  }

  if (!R1C1.test(ref)) {
    throw new Error(ref + ' is not a valid R1C1 cell reference');
  }

  var refParts = ref
    .replace(R1C1, '$1,$2')
    .split(',');

  var row = refParts[0];
  var column = refParts[1];
  var columnStr = '';

  for (; column; column = Math.floor((column - 1) / 26)) {
    columnStr = String.fromCharCode(((column - 1) % 26) + 65) + columnStr;
  }

  return columnStr + row;
}
