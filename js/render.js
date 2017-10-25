'use strict';
window.render = (function () {
  var listElement = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupListFragment = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var render = function (wizards) {
    var drawWizard = function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
      return wizardElement;
    };
    var insertWizardsFragments = function (wizards) {
      var maxWizards = 4;
      listElement.innerHTML = '';
      for (var i = 0; i < maxWizards; i++) {
        setupListFragment.appendChild(drawWizard(wizards[i]));
      }
      listElement.appendChild(setupListFragment);
    };
    insertWizardsFragments(wizards);
    setupSimilar.classList.remove('hidden');
  };
  return render;
})();
