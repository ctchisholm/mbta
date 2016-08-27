
angular.module('departures')
.controller('departureCtrl', function($scope,departureSvc){

	departureSvc.getDepartures().then(
		function success(res){
			if(res.data.length > 0)
			{
				//loop through and add a better time format for display purposes
				for(var i=0; i<res.data.length; i++)
				{
					var dt = $scope.buildTimeObject(res.data[i].scheduledtime*1000);
					res.data[i].scheduledtime = dt.hour + ':' + dt.minutes + dt.hourSuffix;
				}
				$scope.departures = res.data;


				//get the date and time of information from timestamp field
				var date = $scope.buildTimeObject(res.data[0].timestamp*1000);
				$scope.lastUpdated = date.hour + ':' + date.minutes + date.hourSuffix;
				$scope.lastUpdated += ' - ' + date.month + '/' + date.day + '/' + date.year;
			}
		},
		function failed(err){
			alert('error: ' + err);
		}
	);

	$scope.buildTimeObject = function(timestamp)
	{
		var dt = {};

		var date = new Date(timestamp);

		dt.hour = parseInt(date.getHours());
		if(dt.hour > 12) {
			dt.hour -= 12;
			dt.hourSuffix = "pm";
		} else {
			dt.suffix = "am";
		}

		dt.month = date.getMonth()+1;
		dt.day = date.getDay();

		dt.minutes = date.getMinutes();
		dt.seconds = date.getSeconds();
		dt.year = date.getFullYear();

		return dt;
	};

});