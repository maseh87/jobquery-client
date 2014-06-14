app.controller('AdminCandidatesDetailCtrl', ['Resource','$controller', '$scope', function(Resource, $controller , $scope){
  $controller('ResourceDetailCtrl', {$scope: $scope, Resource : Resource});
  $controller('ResourceEditCtrl', {$scope: $scope, Resource : Resource});

}]);
