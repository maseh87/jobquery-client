app.controller('UsersOpportunitiesCtrl',
  ['$scope', 'UsersOpportunity', function ($scope, UsersOpportunity) {

  UsersOpportunity.getAll().then(function (opportunities) {
    $scope.opportunities = opportunities;
  });

}]);
