app.controller('AdminCandidatesNewCtrl', ['User', '$scope', function(User, $scope){

  $scope.sendEmails =  function (emails) {
    if (emails.indexOf(',') !== -1) {
      emails.split(',').forEach( function (email){
        User.create({email : email});
      });
    } else {
      User.create({email : emails});
    }

    //empty emails input
    $scope.emails = "";
  };

  $scope.emailCSVPattern = (function() {
    var regexp = /[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}/;
    return {
        test: function(value) {
          if (value === "" || value === undefined) {
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
