
angular.module('departures')
	.factory('departureSvc', function($http){
		return {
			getDepartures: function(){
				return $http.get('/departures');
			}
		}
	});