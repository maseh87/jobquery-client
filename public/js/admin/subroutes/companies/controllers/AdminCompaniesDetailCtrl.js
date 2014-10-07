 app.controller('AdminCompaniesDetailCtrl', ['$scope', 'Company', '$stateParams', function ($scope, Company, $stateParams) {

  $scope.readOnly = true;

  Company.get($stateParams._id).then(function (company) {
    $scope.company = company;
    $scope.opportunities = company.opportunities;
  });

  var removeEmptyFields = function () {
    $scope.company.media = $scope.company.media.filter(function (item) {
      return item.caption && item.url;
    });

    $scope.company.links = $scope.company.links.filter(function (item) {
      return item.title && item.url;
    });
  };

  $scope.toggleEdit = function () {
    if (!$scope.readOnly) {
      $scope.update();
    }
    $scope.readOnly = !$scope.readOnly;
  };

  $scope.update = function () {
    removeEmptyFields();
    Company.update($scope.company).then(function (data) {
    });
  };

  $scope.addMedia = function () {
    $scope.company.media.push({text: ''});
  };

  $scope.removeMedia = function (index) {
    $scope.company.media.splice(index, 1);
  };

  $scope.addLink = function () {
    $scope.company.links.push({text: ''});
  };

  $scope.removeLink = function (index) {
    $scope.company.links.splice(index, 1);
  };

}]);
