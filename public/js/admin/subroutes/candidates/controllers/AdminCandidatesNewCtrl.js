app.controller('AdminCandidatesNewCtrl', ['Resource', '$controller', '$scope', function(Resource, $controller, $scope){
  $controller('ResourceNewCtrl', {$scope: $scope, Resource : Resource});

}]);
