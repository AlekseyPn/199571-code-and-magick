'use strict';
(function () {
  var KEY_CODE = {
    enter: 13,
    esc: 27
  };
  var CELL_COLORS = {
    outline: '2px dashed red',
    cellBackground: 'yellow'
  };

  var setupHandlers = {
    openPopup: function () {
      window.setup.userDialog.classList.remove('hidden');
      drag.setupCoords = {
        x: window.setup.userDialog.offsetTop,
        y: window.setup.userDialog.offsetLeft
      };
      document.addEventListener('keydown', setupHandlers.popupEscPressHandler);
    },
    closePopup: function () {
      window.setup.userDialog.classList.add('hidden');
      document.removeEventListener('keydown', setupHandlers.popupEscPressHandler);
    },
    popupEscPressHandler: function (evt) {
      if (evt.keyCode === KEY_CODE.esc && document.activeElement !== setupUserName) {
        setupHandlers.closePopup();
      }
    },
    popupEnterPressHandler: function (evt) {
      if (evt.keyCode === KEY_CODE.enter && this === setupOpen) {
        setupHandlers.openPopup();
      } else if (evt.keyCode === KEY_CODE.enter && this === setupClose) {
        setupHandlers.closePopup();
      }
    }
  };
  var drag = {
    startCoords: {
      x: null,
      y: null
    },
    mouseMoveHandler: function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: drag.startCoords.x - moveEvt.clientX,
        y: drag.startCoords.y - moveEvt.clientY
      };
      drag.startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.setup.userDialog.style.top = (window.setup.userDialog.offsetTop - shift.y) + 'px';
      window.setup.userDialog.style.left = (window.setup.userDialog.offsetLeft - shift.x) + 'px';
    },
    mouseUpHandler: function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', drag.mouseMoveHandler);
      document.removeEventListener('mouseup', drag.mouseUpHandler);
    },
    dragStartHandler: function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target.cloneNode();
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    },
    elemDropHandler: function (evt) {
      if (evt.target.classList.contains('setup-artifacts-cell')) {
        evt.target.style.background = '';
        evt.target.appendChild(draggedItem);
        evt.preventDefault();
      }
      return false;
    },
    elemDragEnterHandler: function (evt) {
      if (!evt.target.classList.contains('setup-artifacts-cell')) {
        artifactsElement.removeEventListener('drop', drag.elemDropHandler);
      } else {
        artifactsElement.addEventListener('drop', drag.elemDropHandler);
        evt.target.style.background = CELL_COLORS.cellBackground;
        evt.preventDefault();
      }

    },
    elemDragLeaveHandler: function (evt) {
      evt.target.style.background = '';
      evt.preventDefault();
    }
  };

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var dialogHandle = document.querySelector('.setup-user-pic');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;
  setupOpen.addEventListener('click', setupHandlers.openPopup);
  setupOpen.addEventListener('keydown', setupHandlers.popupEnterPressHandler);
  setupClose.addEventListener('click', setupHandlers.closePopup);
  setupClose.addEventListener('keydown', setupHandlers.popupEnterPressHandler);
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    drag.startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', drag.mouseMoveHandler);
    document.addEventListener('mouseup', drag.mouseUpHandler);
  });
  shopElement.addEventListener('dragstart', drag.dragStartHandler);
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragenter', drag.elemDragEnterHandler);

  artifactsElement.addEventListener('dragleave', drag.elemDragLeaveHandler);
})();
