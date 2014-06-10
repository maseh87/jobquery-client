app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		// home page
		.state('home', {
			url: '/',
			templateUrl: '../views/home.html',
			controller: 'appCtrl'
		});

}]);