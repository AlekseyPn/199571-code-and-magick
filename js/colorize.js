'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    setupWizard = document.querySelector('.wizard'),
    setupWizardCoat = document.querySelector('.wizard-coat'),
    setupWizardEyes = document.querySelector('.wizard-eyes'),
    setupFireball = document.querySelector('.setup-fireball-wrap'),
    colorsIndex = {
      coat: 0,
      eyes: 0,
      fireball: 0
    },
    incrementColorIndex = function (index, colors) {
      return (index + 1) % colors.length;
    },
    colorize = {
      fillElement: function (elem, colors, index) {
        elem.style.fill = colors[index];
        return colors[index];
      },
      changeElementBackground: function (elem, colors, index) {
        elem.style.backgroundColor = colors[index];
        return colors[index];
      },
      colorizeElement: function (elem, colors, index, cb) {
        cb(elem, colors, index);
      }
    };
  setupWizard.addEventListener('click', function (evt) {
    var evtTarget = evt.target;
    switch (evtTarget) {
      case setupWizardCoat:
        colorize.colorizeElement(setupWizardCoat, COAT_COLORS, colorsIndex.coat, colorize.fillElement);
        window.setup.onCoatChange(COAT_COLORS[colorsIndex.coat]);
        colorsIndex.coat = incrementColorIndex(colorsIndex.coat, COAT_COLORS);
        break;
      case setupWizardEyes:
        colorize.colorizeElement(setupWizardEyes, EYES_COLORS, colorsIndex.eyes, colorize.fillElement);
        window.setup.onEyesChange(EYES_COLORS[colorsIndex.eyes]);
        colorsIndex.eyes = incrementColorIndex(colorsIndex.eyes, EYES_COLORS);
        break;
    }
  });
  setupFireball.addEventListener('click', function () {
    colorize.colorizeElement(setupFireball, FIREBALL_COLORS, colorsIndex.fireball, colorize.changeElementBackground);
    colorsIndex.fireball = incrementColorIndex(colorsIndex.fireball, FIREBALL_COLORS);
  });
})();
