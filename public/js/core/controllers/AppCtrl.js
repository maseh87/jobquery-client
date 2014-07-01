app.controller('AppCtrl', ['$scope', '$location', 'DialogueService', function ($scope, $location, DialogueService) {

}]);


app.run(['$rootScope', '$state', '$location', 'localStorageService',
  function ($rootScope, $state, $location, localStorageService) {

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ['login', 'send', 'reset'];

  // check if current location matches route
  var routeClean = function (route) {
    var needsAuthorization = true;
    routesThatDontRequireAuth.forEach(function (noAuthRoute) {
      var regex = new RegExp(noAuthRoute, 'g');
      if(route.match(regex)){
        needsAuthorization = false;
      }
    });
    return needsAuthorization;
  };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    var isTokenInDate = function() {
      var tokenDate = new Date(JSON.parse(localStorageService.get('token-date')));
      if (tokenDate) {
        var today = new Date();
        var timeDiff = Math.abs(today.getTime() - tokenDate.getTime());
        var diffDays = timeDiff / (1000 * 3600 * 24);
        if(diffDays > 0.25) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    };
    // if route requires auth and user is not logged in
    if (routeClean($location.url()) && !isTokenInDate()) {
      // redirect back to login
      $location.path('/login');
    }
  });
}]);
