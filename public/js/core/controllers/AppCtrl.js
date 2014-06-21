app.controller('AppCtrl', function($scope, $location) {

    // a bit hacky but it will do for now!
    $scope._getCurrentView = function(name) {
        console.log($location.$$path.split('/'));
        return $location.$$path.split('/').indexOf(name) >= 0;
    };
});