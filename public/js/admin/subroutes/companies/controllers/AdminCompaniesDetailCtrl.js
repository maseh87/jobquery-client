app.controller('AdminCompaniesDetailCtrl', ['$scope', '$controller', 'Resource', function($scope, $controller, Resource){
  $controller('ResourceDetailCtrl', {$scope: $scope, Resource: Resource});
  $controller('ResourceEditCtrl', {$scope: $scope, Resource: Resource});

}]);