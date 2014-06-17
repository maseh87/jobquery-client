app.controller('UsersOpportunitiesDetailCtrl', ['$stateParams', '$scope', 'Opportunity', 
function($stateParams, $scope, Opportunity){

  Opportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

}]);