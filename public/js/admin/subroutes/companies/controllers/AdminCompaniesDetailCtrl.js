app.controller('AdminCompaniesDetailCtrl', ['$scope', 'Company', '$stateParams', function($scope, Company, $stateParams){

  Company.get($stateParams._id).then(function(company){
    $scope.company = company;
    $scope.opportunities = company.opportunities;
  });

}]);