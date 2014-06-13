app.controller('ResourceDetailCtrl', ['Resource', '$scope', '$stateParams', function(Resource, $scope, $stateParams){

  Resource.get({_id: $stateParams._id}).$promise.then(function(resource){
    $scope.resource = resource;
  });

}]);