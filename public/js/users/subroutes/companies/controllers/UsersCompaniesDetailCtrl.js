app.controller('UsersCompaniesDetailCtrl', ['$stateParams', '$scope', 'UsersCompany',
function ($stateParams, $scope, UsersCompany) {
  $scope.what = 'what';

  UsersCompany.get($stateParams._id).then(function (company) {
    $scope.company = company;
    $scope.opportunities = company.opportunities;
  });

}]);
