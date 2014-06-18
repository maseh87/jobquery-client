app.controller('UsersOpportunitiesDetailCtrl', ['$stateParams', '$scope', 'UsersOpportunity', 
function($stateParams, $scope, UsersOpportunity){

  UsersOpportunity.get($stateParams._id).then(function(opportunity){
    $scope.opportunity = opportunity;
  });

  $scope.submit = function(){
    $scope.opportunity.match.interest = parseInt($scope.opportunity.match.interest);
    UsersOpportunity.update($scope.opportunity).then(function(opportunity){
      console.log(opportunity);
    });
  };

}]);