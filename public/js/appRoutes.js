app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		// home page
		.state('home', {
			url: '',
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.state('route1', {
			url: '/route1'
			templateUrl: 'views/routeOne.html',
			controller: 'RouteOneController'
		})
		.state('route2', {
			url: '/route2'
			templateUrl: 'views/routeTwo.html',
			controller: 'RouteTwoController'	
		});

	$locationProvider.html5Mode(true);

}]);