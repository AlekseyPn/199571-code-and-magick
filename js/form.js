'use strict';
window.form = (function () {
  var SUCCESS_MESSAGE = 'Ваши данные успешно отправленны, спасибо!';
  var userForm = document.querySelector('.setup-wizard-form');
  var successHandler = function () {
    window.dialog.closePopup();
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: green;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.padding = '20px 0';
    node.style.height = '50px';
    node.style.fontSize = '30px';

    node.textContent = SUCCESS_MESSAGE;
    document.body.insertAdjacentElement('afterbegin', node);
    var successMessageTimeout = setTimeout(function () {
      node.style.display = 'none';
      clearTimeout(successMessageTimeout);
    }, 3000);
  };
  userForm.addEventListener('submit', function () {
    window.backend.save(window.setup.errorHandler, new FormData(userForm), successHandler);
    event.preventDefault();
  });
})();
