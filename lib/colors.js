var create = function (r, g) { return 12 + r + 8 * g };

var colors = {
  none      : create(0, 0),
  green     : create(0, 3),
  yellow    : create(2, 3),
  red       : create(3, 0),
  amber     : create(3, 2),
  orange    : create(3, 3),
  dimRed    : create(1, 0),
  dimGreen  : create(0, 1),
  dimOrange : create(1, 1)
};

module.exports = colors;
