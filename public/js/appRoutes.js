app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/routeOne', {
			templateUrl: 'views/routeOne.html',
			controller: 'RouteOneController'
		})

		.when('/routeTwo', {
			templateUrl: 'views/routeTwo.html',
			controller: 'RouteTwoController'	
		});

	$locationProvider.html5Mode(true);

}]);