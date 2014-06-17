app.controller('UsersCompaniesDetailCtrl', ['$stateParams', '$scope', 'Company', 
function($stateParams, $scope, Company){

  Company.get($stateParams._id).then(function(company){
    $scope.company = company;
    $scope.opportunities = company.opportunities;
  });

}]);