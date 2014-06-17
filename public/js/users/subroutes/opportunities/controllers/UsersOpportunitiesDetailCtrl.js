app.controller('UsersOpportunitiesDetailCtrl', ['$stateParams', '$scope', 'UsersOpportunity', 
function($stateParams, $scope, UsersOpportunity){

  UsersOpportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

}]);