app.factory('DialogueService', function () {

  serviceMethods = {};

  serviceMethods._hidden = false;

  serviceMethods.setMessage = function (title, message) {
    document.getElementById('dialogue-title').innerHTML = title;
    document.getElementById('dialogue-content').innerHTML = message;
  };

  serviceMethods.toggle = function () {
    serviceMethods._hidden = !serviceMethods._hidden;
  };

  return serviceMethods;

});