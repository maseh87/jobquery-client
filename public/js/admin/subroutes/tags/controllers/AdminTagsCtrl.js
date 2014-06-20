app.controller('AdminTagsCtrl', ['$scope', 'Tag', function($scope, Tag){

  var initialize = function(){
    Tag.getAll().then(function(tags){
      $scope.tags = tags;
    });
  };

  $scope.save = function(tag){
    if(tag._id){
      Tag.update(tag).then(function(data){
        console.log('Tag updated successfully');
      });
    } else {
      Tag.create(tag).then(function(data){
        console.log('Tag created successfully');
      });
    }
  };

  $scope.add = function(){
    $scope.tags.unshift({});
  };

  initialize();

}]);