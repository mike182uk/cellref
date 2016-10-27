# Cellref

[![Version](https://img.shields.io/npm/v/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)
[![Build Status](https://img.shields.io/travis/mike182uk/cellref.svg?style=flat-square)](http://travis-ci.org/mike182uk/cellref)
[![Code Climate](https://img.shields.io/codeclimate/github/mike182uk/cellref.svg?style=flat-square)](https://codeclimate.com/github/mike182uk/cellref)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/cellref/master.svg?style=flat-square)](https://coveralls.io/r/mike182uk/cellref)
[![npm](https://img.shields.io/npm/dm/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)
[![License](https://img.shields.io/github/license/mike182uk/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

Convert between cell reference styles (`A1` notation & `R1C1` notation).

## Installation

```
npm install --save cellref
```

## Usage

### Convert A1 to R1C1

```js
var cellref = require('cellref');

cellref.toR1C1('BU59'); // will return R59C73
```

### Convert R1C1 to A1

```js
var cellref = require('cellref');

cellref.toA1('R59C73'); // will return BU59
```

### Convert automatically based on the input

```js
var cellref = require('cellref');

cellref('R59C73'); // will return BU59
cellref('BU59'); // will return R59C73
```

### Covert A1 range to R1C1 range

```js
var cellref = require('cellref');

cellref.toR1C1('BU59:BU60', true); // will return R59C73:R60C73
cellref.toR1C1Range('BU59:BU60'); // will return R59C73:R60C73
```

### Covert R1C1 range to A1 range

```js
var cellref = require('cellref');

cellref.toA1('R59C73:R60C73', true); // will return BU59:BU60
cellref.toA1Range('R59C73:R60C73'); // will return BU59:BU60
```

### Convert range automatically based on the input

```js
var cellref = require('cellref');

cellref('BU59:BU60', true); // will return R59C73:R60C73
cellref('R59C73:R60C73', true); // will return BU59:BU60

cellref.range('BU59:BU60'); // will return R59C73:R60C73
cellref.range('R59C73:R60C73'); // will return BU59:BU60
```

If an invalid cell reference (not `A1` or `R1C1` notation) is passed as an argument to any of the methods, an `Error` will be thrown.
