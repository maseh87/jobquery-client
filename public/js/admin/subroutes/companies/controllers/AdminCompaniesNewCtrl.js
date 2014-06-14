app.controller('AdminCompaniesNewCtrl', ['$scope', '$controller', 'Resource', function($scope, $controller, Resource){
  $controller('ResourceNewCtrl', {$scope: $scope, Resource: Resource});

}]);