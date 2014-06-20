app.controller('AdminDashboardCtrl', ['$scope', '$stateParams', 'User', function($scope, $stateParams, User){

  User.get($stateParams._id).then(function(admin){
    $scope.admin = admin;
    console.log('yoyo');
  });
}]);
