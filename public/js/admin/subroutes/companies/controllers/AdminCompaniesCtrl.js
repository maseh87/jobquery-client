app.controller('AdminCompaniesCtrl', ['$scope', '$controller', 'Resource', function($scope, $controller, Resource){
  $controller('ResourceCtrl', {$scope: $scope, Resource: Resource});

}]);