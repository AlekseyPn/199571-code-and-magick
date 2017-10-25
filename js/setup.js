'use strict';
window.setup = (function () {
  var wizards = [];
  var currentColors = {
    coatColor: null,
    eyesColor: null
  };
  var onEyesChange = function (color) {
    currentColors.eyesColor = color;
    window.debounce(updateWizards);
  };
  var onCoatChange = function (color) {
    currentColors.coatColor = color;
    window.debounce(updateWizards);
  };
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(errorHandler, successHandler);
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === currentColors.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentColors.eyesColor) {
      rank += 1;
    }
    return rank;
  };
  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };
  return {
    errorHandler: errorHandler,
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };
})();
