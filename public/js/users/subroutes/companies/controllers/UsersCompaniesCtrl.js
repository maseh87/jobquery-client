app.controller('UsersCompaniesCtrl', ['$scope', 'Company', function($scope, Company){

  Company.getAll().then(function(companies){
    $scope.companies = companies;
  });

}])