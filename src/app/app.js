	//
    // Defining Module
    //
	var spApp = angular.module( "ngSpApp", ['ngRoute'] );
	//
    // Defining Routes
    //
    spApp.config(function($routeProvider) {
		$routeProvider.when('/link1', {
			controller : 'Link1Ctrl',
			templateUrl : 'views/about.html'
		}).otherwise({
			controller : 'HomeCtrl',
			templateUrl: 'views/home.html'
		});
    });
    //
    // Controller for Home Page
    //
    spApp.controller( "HomeCtrl", [ '$scope', function($scope) {
		$scope.text = 'Hello, this is homepage';
    }]);
    //
    // Controller for Link1 Page
    //
	spApp.controller( "Link1Ctrl", [ '$scope', function($scope) {
		$scope.text = 'Hello, this is link1 page';
	}]);
