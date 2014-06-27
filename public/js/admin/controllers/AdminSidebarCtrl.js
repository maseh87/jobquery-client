app.controller('AdminSidebarCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state){

    // ui-sref-active does not supported nested states right now, hence this ugly fix:
    // https://github.com/angular-ui/ui-router/issues/704

    var sidebarIds = {
        'dashboard': 'sidebar-dashboard',
        'opportunities': 'sidebar-opportunities',
        'companies': 'sidebar-companies',
        'profile': 'sidebar-profile',
        'candidates': 'sidebar-candidates',
        'matches': 'sidebar-matches',
        'tags': 'sidebar-tags'
    };

    $scope.currentStateHeading = "opportunities";

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        var fromState = $scope.currentStateHeading;
        document.getElementById(sidebarIds[fromState]).classList.remove('sidebar-active');

        var newState = Object.keys(sidebarIds).filter(function (state) {
            return toState.name.indexOf(state) > -1;
        })[0];
        $scope.currentStateHeading = newState;
        document.getElementById(sidebarIds[newState]).classList.add('sidebar-active');
    });
}]);
