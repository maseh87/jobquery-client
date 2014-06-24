app.controller('UsersOpportunitiesDetailCtrl', ['$scope', 'UsersOpportunity', '$stateParams',
function($scope, UsersOpportunity, $stateParams) {

  UsersOpportunity.get($stateParams._id).then(function(data){
    console.log(data);
  });

}]);
