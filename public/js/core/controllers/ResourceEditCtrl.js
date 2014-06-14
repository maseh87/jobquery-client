app.controller('ResourceEditCtrl', ['Resource', '$scope', '$stateParams', function(Resource, $scope , $stateParams){

  $scope.update = function(resource) {
    Resource.update (resource._id, resource).$promise
      .then(function(success){
        $scope.updated = true;
      }, function (error) {
        $scope.updateError = true;
      });
  };

  $scope.readOnly = true;

}]);
