app.controller('AdminSidebarCtrl', ['$scope', function ($scope){

    $scope.currentState = "dashboard";
    $rootScope.on('$stateChangeSuccess', function() {

    });

}]);
