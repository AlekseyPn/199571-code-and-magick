'use strict';
(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWizard = document.querySelector('.wizard');
  var setupWizardCoat = document.querySelector('.wizard-coat');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var colorsIndex = {
    coat: 0,
    eyes: 0,
    fireball: 0
  };
  var incrementColorIndex = function (index, colors) {
    return (index + 1) % colors.length;
  };
  var colorize = {
    fillElement: function (elem, colors, index) {
      elem.style.fill = colors[index];
    },
    changeElementBackground: function (elem, colors, index) {
      elem.style.backgroundColor = colors[index];
    }
  };
  setupWizard.addEventListener('click', function (evt) {
    var evtTarget = evt.target;
    switch (evtTarget) {
      case setupWizardCoat:
        window.colorizeElement(setupWizardCoat, window.setup.coatColors, colorsIndex.coat, colorize.fillElement);
        colorsIndex.coat = incrementColorIndex(colorsIndex.coat, window.setup.coatColors);
        break;
      case setupWizardEyes:
        window.colorizeElement(setupWizardEyes, window.setup.eyesColors, colorsIndex.eyes, colorize.fillElement);
        colorsIndex.eyes = incrementColorIndex(colorsIndex.eyes, window.setup.eyesColors);
        break;
    }
    return false;
  });
  setupFireball.addEventListener('click', function () {
    window.colorizeElement(setupFireball, FIREBALL_COLORS, colorsIndex.fireball, colorize.changeElementBackground);
    colorsIndex.fireball = incrementColorIndex(colorsIndex.fireball, FIREBALL_COLORS);
  });
})();
