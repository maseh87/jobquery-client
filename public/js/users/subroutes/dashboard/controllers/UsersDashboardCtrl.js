app.controller('UsersDashboardCtrl', ['$scope', 'UsersOpportunity', function ($scope, UsersOpportunity) {

  var initialize = function () {
    UsersOpportunity.getAll().then(function (opportunities) {
      opportunities = opportunities.filter(function (opportunity) {
        return opportunity.match.interest === 0;
      });
      $scope.opportunities = opportunities;
    });
  };

  $scope.submit = function () {
    $scope.opportunities[0].match.interest = parseInt($scope.opportunities[0].match.interest);
    UsersOpportunity.update($scope.opportunities[0]).then(function (opportunity) {
      $scope.opportunities.shift();
    });
  };

  initialize();

}]);
