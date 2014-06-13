app.controller('ResourceDetailCtrl', ['Resource', '$scope', '$stateParams', function(Resource, $scope, $stateParams){

  $scope.resource = Resource.get({_id: $stateParams._id});

}]);