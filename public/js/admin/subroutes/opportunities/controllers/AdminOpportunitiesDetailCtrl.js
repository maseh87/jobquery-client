app.controller('AdminOpportunitiesDetailCtrl', ['$scope', '$stateParams', 'Opportunity', 'Match', 'Tag', 'User', 
  function($scope, $stateParams, Opportunity, Match, Tag, User) {

  Opportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

  // *****
  // I have to do this crazy ugly logic until we come up with a better way on the backend!
  // *****
  Tag.getAll().then(function(tags) {
    $scope.tagCollection = tags;
    Match.getAll().then(function(matches){
      $scope.users = [];
      $scope.matches = matches.data.filter(function (match) {
        return match.oppId.toString() === $stateParams._id.toString();
      });
      $scope.matches.forEach(function (match) {
        var user = {};
        user._name = match.userId.name;
        user._email = match.userId.email;
        user._interest = match.userInterest;
        user._attributes = match.oppId.tags.map(function (matchTag) {
          var traitMatches = match.userId.tags.filter(function (userTag) {
            return userTag.tagId.name === matchTag.tagId.name;
          })[0];
          return traitMatches.length === 0 ? 0 : traitMatches[0];
        });
        $scope.users.push(user);
      });
    });
  });

  $scope.readOnly = true;
  $scope.editButtonText = "+ Edit Opportunity";
  $scope.toggleEdit = function () {
    if (!$scope.readOnly) { $scope.save(); }
    $scope.readOnly = !$scope.readOnly;
    $scope.editButtonText = $scope.readOnly ? "+ Edit Opportunity" : "Save Opportunity";
  }; 

  $scope.addNewItem = function (attribute, field) {
    if ($scope.readOnly) { return null; }
    $scope.opportunity[attribute].push(field);
  };

  $scope.removeItem = function (attribute, item) {
    if ($scope.readOnly) { return null; }
    $scope.opportunity[attribute].forEach(function(elem, i, a) {
      if (elem.$$hashKey === item.$$hashKey) { a.splice(i, 1); }
    });
  };

  $scope.save = function () {
    Opportunity.update($scope.opportunity).then(function(data){
      console.log('Update successful');
    });
  };

}]);