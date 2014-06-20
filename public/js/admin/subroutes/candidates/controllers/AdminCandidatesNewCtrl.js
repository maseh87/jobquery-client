app.controller('AdminCandidatesNewCtrl', ['User', '$scope', function(User, $scope){

  $scope.sendEmails =  function (emailStrings) {
    if (emailStrings === undefined || emailStrings.length === 0 ) {
      // do something here, possibly alert user
      // or fix that ng-pattern does not get engaged until something is enterd
    } else {
      var emails = [];
      if (emailStrings.indexOf(',') !== -1) {
          emailStrings.split(',').forEach( function (email){
            emails.push(email);
          });
      } else {
        emails.push(emailStrings);
      }
      User.invite(emails)
        .success(function (data) {
          $scope.showMessage();
          $scope.alertMessage = "Invitations successful!";
        })
        .error(function (data) {
          $scope.alertMessage = 'Please remove these existing users: ' + (data).join(',');
          $scope.showMessage();
        });
    }
    //empty emailStrings input
    $scope.emailStrings = "";
  };

  $scope.showAlert = false;
  $scope.hideMessage = function () {
    $scope.showAlert = false;
  };

  $scope.showMessage = function () {
    $scope.showAlert = true;
  };

  $scope.emailCSVPattern = (function() {
    var regexp = /[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}/;
    return {
        test: function(value) {
          if (value === "" || value === " " || value === undefined) {
            return false;
          } else {
            var emails = value.split(',');
            var valid = true;

            for(var i = 0; i < emails.length; i++) {
              valid = regexp.test(emails[i]) && valid;
            }
            return valid;
          }
        }
    };
  });
}]);
