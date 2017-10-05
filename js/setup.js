/* eslint-disable no-invalid-this */
'use strict';
window.setup = (function () {
  var randomizeOrder = function (data) {
    var dataClone = data.slice(0, data.length);
    return dataClone.sort(function () {
      return Math.random() - 0.5;
    });
  };
  var successHandler = function (data) {
    var wizards = data;
    WIZARDS_INIT.init(randomizeOrder(wizards), setupListFragment, listElement, setupSimilar);
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
  var WIZARDS_INIT = {
    drawWizard: function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
      return wizardElement;
    },
    insertWizardsFragments: function (wizards, fragment, elem) {
      var maxWizards = 4;
      for (var i = 0; i < maxWizards; i++) {
        fragment.appendChild(this.drawWizard(wizards[i]));
      }
      elem.appendChild(fragment);
    },
    showNode: function (elem) {
      elem.classList.remove('hidden');
    },
    init: function (wizards, fragment, elem, setupElem) {
      this.insertWizardsFragments(wizards, fragment, elem);
      this.showNode(setupElem);
    }
  };
  var userDialog = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var listElement = userDialog.querySelector('.setup-similar-list');
  var setupSimilar = userDialog.querySelector('.setup-similar');
  var setupListFragment = document.createDocumentFragment();

  window.backend.load(errorHandler, successHandler);

  return {
    errorHandler: errorHandler,
    userDialog: userDialog
  };
})();
