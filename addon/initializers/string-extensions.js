export function initialize(/* container, application */) {
  countDecimals();
}

export default {
  name: 'string-extensions',
  initialize: initialize
};

function countDecimals() {
  String.prototype.countDecimals = function() {
    if (isNaN(this)) {throw `'${this}' is not a number`;}

    let num = this;
    let match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
       0,
       // Number of digits right of decimal point.
       // Adjust for scientific notation.
       (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };
}
