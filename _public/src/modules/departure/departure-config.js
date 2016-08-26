angular.module('departures')
	.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/departures');

	$stateProvider.state('departures',{
		url: '/departures',
		templateUrl: 'templates/departures-view.html'
	}).state('about',{
		url: '/about',
		templateUrl: '../templates/about.html'
	});

});