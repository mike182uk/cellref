# cellref

[![Version](https://img.shields.io/npm/v/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mike182uk/cellref/ci.yml?branch=main&style=flat-square)](https://github.com/mike182uk/cellref/actions/workflows/ci.yml?query=workflow%3ACI)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/cellref/main.svg?style=flat-square)](https://coveralls.io/r/mike182uk/cellref)
[![npm](https://img.shields.io/npm/dm/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)
[![License](https://img.shields.io/github/license/mike182uk/cellref.svg?style=flat-square)](https://www.npmjs.com/package/cellref)

Convert between cell reference styles (`A1` notation & `R1C1` notation).

## Installation

```
npm install --save cellref
```

## Usage

### Convert A1 to R1C1

```js
const cellref = require('cellref')

cellref.toR1C1('BU59') // will return R59C73
```

### Convert R1C1 to A1

```js
const cellref = require('cellref')

cellref.toA1('R59C73') // will return BU59
```

### Convert automatically based on the input

```js
const cellref = require('cellref')

cellref('R59C73') // will return BU59
cellref('BU59') // will return R59C73
```

If an invalid cell reference (not `A1` or `R1C1` notation) is passed as an argument to any of cellref functions, an `Error` will be thrown.
