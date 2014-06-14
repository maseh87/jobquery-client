app.controller('AdminCandidatesCtrl', ['Resource', '$controller', '$scope', function(Resource, $controller, $scope){
  $controller('ResourceCtrl', {$scope: $scope, Resource : Resource});

}]);
