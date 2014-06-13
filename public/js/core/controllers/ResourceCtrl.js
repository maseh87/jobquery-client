app.controller('ResourceCtrl', ['Resource', '$scope', function(Resource, $scope){

  Resource.query().$promise.then(function(resources){
    $scope.resources = resources;
  });

}]);