app.controller('AdminCandidatesNewCtrl', ['User', '$scope', 'Category', function (User, $scope, Category) {

  Category.getAll('User').then(function(categories){
    $scope.categories = categories;
  });

  var parseEmails = function(emailStrings){
    return emailStrings
      .replace(/\n|\s/g, ',')
      .split(',')
      .filter(function(email){ 
        if(email.match(/@/g)) return email; 
      });
  };

  $scope.sendEmails =  function (emailStrings) {
    if (emailStrings === undefined || emailStrings.length === 0 ) {
      // do something here, possibly alert user
      // or fix that ng-pattern does not get engaged until something is enterd
    } else {
      var emails = parseEmails(emailStrings);
      User.invite(emails, $scope.category)
        .success(function (data) {
          if(Array.isArray(data) && data.length > 0) {
            $scope.alertMessage = 'Please remove the following existing users and send again: ' + (data).join(',');
            $scope.showMessage();
          } else {
            $scope.showMessage();
            $scope.alertMessage = "Invitations sent!";
          }
        })
        .error(function (data) {
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

  $scope.emailCSVPattern = (function () {
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

  $scope.addNewCategory = function(newCategoryName){
    var newCategory = {
      name: newCategoryName,
      type: 'User'
    };
    Category.create(newCategory).then(function(response){
      newCategory._id = response._id;
      $scope.categories.push(newCategory);
      $scope.category = $scope.categories[$scope.categories.length - 1];
      $scope.creatingCategory = false;
    })
  };

  $scope.interceptEnter = function(e){
    if(e.keyCode === 13){
      e.preventDefault();
      $scope.addNewCategory($scope.newCategory);
    }
  }


}]);
