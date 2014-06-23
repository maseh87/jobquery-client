app.controller('UsersCompaniesCtrl', ['$scope', 'UsersCompany', function ($scope, UsersCompany) {

  UsersCompany.getAll().then(function (companies) {
    $scope.companies = companies;
  });

}]);
