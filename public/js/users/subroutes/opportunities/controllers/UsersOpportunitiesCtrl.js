app.controller('UsersOpportunitiesCtrl',
  ['$scope', 'UsersOpportunity', function($scope, UsersOpportunity){

  UsersOpportunity.getAll().then(function(opportunities){
    console.dir(opportunities.data);
    $scope.opportunities = opportunities;
  });

}]);
