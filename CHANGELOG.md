# Changelog

## 8.0.0

- Drop support for Node.js `< 12.0.0`

## 4.0.0

- Drop support for Node.js `< 8.0.0`

## 3.0.0

- Drop support for Node.js `< 4.0.0`

## 2.0.2

- Fix issue where invalid R1C1 ref could be passed to `cellref.toA1` ([@robinbullocks4rb](https://github.com/robinbullocks4rb))

## 2.0.1

- Fix issue where R1C1 notation was being decoded incorrectly ([#16](https://github.com/mike182uk/cellref/issues/16))

## 2.0.0

- Errors are now thrown when an invalid cell reference is passed as an argument
- Simplified regex's used to match notations
- Cleaned up internals

## 1.0.0

First release
