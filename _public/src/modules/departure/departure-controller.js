
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