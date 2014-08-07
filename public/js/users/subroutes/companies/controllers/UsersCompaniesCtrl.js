app.controller('UsersCompaniesCtrl', ['$scope', 'UsersCompany', function ($scope, UsersCompany) {
  $scope.opp = "Opportunities";
  UsersCompany.getAll().then(function (companies) {
    $scope.companies = companies;
    console.log($scope.companies);
  });
  $scope.num = function(index) {
    if($scope.companies[index].opportunities.length === 1) {
      $scope.opp = "Opportunity";
      return $scope.companies[index].opportunities.length;
    } else {
      $scope.opp = "Opportunities";
      return $scope.companies[index].opportunities.length;
    }
  };

}]);
