app.controller('UsersSidebarCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

    // ui-sref-active does not supported nested states right now, hence this ugly fix:
    // https://github.com/angular-ui/ui-router/issues/704

    var sidebarIds = {
        'dashboard': 'sidebar-dashboard',
        'opportunities': 'sidebar-opportunities',
        'companies': 'sidebar-companies',
        'account': 'sidebar-account',
        'profile': 'sidebar-profile',
        'candidates': 'sidebar-candidates',
        'matches': 'sidebar-matches',
        'tags': 'sidebar-tags',
    };

    $scope.currentStateHeading = $state.current.name.split('.')[1];
    document.getElementById(sidebarIds[$scope.currentStateHeading]).classList.add('sidebar-active');

    var getNewState = function (toState) {
        var defaultState = "dashboard";
        for (var state in sidebarIds) {
            if (toState.hasOwnProperty("name") && toState.name.indexOf(state) > -1) { return state; }
        }
        return defaultState;
    };

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        var fromState = $scope.currentStateHeading;
        $scope.currentStateHeading = getNewState(toState);

        var $fromState = document.getElementById(sidebarIds[fromState]);
        var $toState = document.getElementById(sidebarIds[$scope.currentStateHeading]);

        if ($fromState) { $fromState.classList.remove('sidebar-active'); }
        if ($toState) { $toState.classList.add('sidebar-active'); }
    });

}]);
