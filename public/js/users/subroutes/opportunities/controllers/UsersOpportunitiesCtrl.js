app.controller('UsersOpportunitiesCtrl', ['$scope', 'Opportunity', function($scope, Opportunity){

  Opportunity.getAll().then(function(opportunities){
    $scope.opportunities = opportunities;
  });

}])