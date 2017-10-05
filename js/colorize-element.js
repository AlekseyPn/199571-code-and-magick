'use strict';
window.colorizeElement = (function () {
  var colorizeElement = function (elem, colors, index, cb) {
    cb(elem, colors, index);
  };
  return colorizeElement;
})();
