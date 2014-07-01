app.factory('DialogueService', function () {

  var $dialogue = document.getElementById('dialogue-box');
  $dialogue.addEventListener('click', function() {
    $dialogue.setAttribute('style', 'display: none');
  });
  $dialogue.addEventListener('blur', function() {
    $dialogue.setAttribute('style', 'display: none');
  });

  serviceMethods = {};

  serviceMethods._hidden = false;

  serviceMethods.setMessage = function (title, message) {
    document.getElementById('dialogue-title').innerHTML = title;
    document.getElementById('dialogue-content').innerHTML = message;
  };

  serviceMethods.clear = function() {
    document.getElementById('dialogue-title').innerHTML = "";
    document.getElementById('dialogue-content').innerHTML = "";
  };

  serviceMethods.toggle = function () {
    serviceMethods._hidden ? serviceMethods.show() : serviceMethods.hide();
  };

  serviceMethods.show = function () {
    serviceMethods._hidden = false;
    document.getElementById('dialogue-box').setAttribute('style', 'display: block');
  };

  serviceMethods.hide = function () {
    serviceMethods._hidden = true;
    document.getElementById('dialogue-box').setAttribute('style', 'display: none');
  };

  serviceMethods.clearAndHide = function () {
    serviceMethods.hide();
    serviceMethods.clear();
  };

  return serviceMethods;

});