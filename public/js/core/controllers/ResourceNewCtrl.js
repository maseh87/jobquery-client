app.controller('ResourceNewCtrl', ['Resource', '$scope', function(Resource, $scope){

  $scope.save = function(resource) {
    Resource.save(resource).$promise
      .then(function(success){
        $scope.saved = true;
      }, function (error) {
        $scope.saveError = true;
      });
  };

}]);
