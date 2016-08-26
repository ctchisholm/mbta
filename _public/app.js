
angular.module('departures', ['ui.router']);
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

angular.module('departures')
.controller('departureCtrl', function($scope,departureSvc){

	departureSvc.getDepartures().then(
		function success(data){

			$scope.departures = data.data;
		},
		function failed(err){
			alert('error: ' + err);
		}
	);

});

angular.module('departures')
	.factory('departureSvc', function($http){
		return {
			getDepartures: function(){
				return $http.get('/departures');
			}
		}
	});