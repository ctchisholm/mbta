
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

angular.module('departures')
	.factory('departureSvc', function($http){
		return {
			getDepartures: function(){
				return $http.get('/departures');
			}
		}
	});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVwYXJ0dXJlL21vZHVsZS5qcyIsIm1vZHVsZXMvZGVwYXJ0dXJlL2RlcGFydHVyZS1jb25maWcuanMiLCJtb2R1bGVzL2RlcGFydHVyZS9kZXBhcnR1cmUtY29udHJvbGxlci5qcyIsIm1vZHVsZXMvZGVwYXJ0dXJlL2RlcGFydHVyZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5hbmd1bGFyLm1vZHVsZSgnZGVwYXJ0dXJlcycsIFsndWkucm91dGVyJ10pOyIsImFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJylcblx0LmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvZGVwYXJ0dXJlcycpO1xuXG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZXBhcnR1cmVzJyx7XG5cdFx0dXJsOiAnL2RlcGFydHVyZXMnLFxuXHRcdHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2RlcGFydHVyZXMtdmlldy5odG1sJ1xuXHR9KS5zdGF0ZSgnYWJvdXQnLHtcblx0XHR1cmw6ICcvYWJvdXQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnLi4vdGVtcGxhdGVzL2Fib3V0Lmh0bWwnXG5cdH0pO1xuXG59KTsiLCJcbmFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJylcbi5jb250cm9sbGVyKCdkZXBhcnR1cmVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLGRlcGFydHVyZVN2Yyl7XG5cblx0ZGVwYXJ0dXJlU3ZjLmdldERlcGFydHVyZXMoKS50aGVuKFxuXHRcdGZ1bmN0aW9uIHN1Y2Nlc3MocmVzKXtcblx0XHRcdGlmKHJlcy5kYXRhLmxlbmd0aCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vbG9vcCB0aHJvdWdoIGFuZCBhZGQgYSBiZXR0ZXIgdGltZSBmb3JtYXQgZm9yIGRpc3BsYXkgcHVycG9zZXNcblx0XHRcdFx0Zm9yKHZhciBpPTA7IGk8cmVzLmRhdGEubGVuZ3RoOyBpKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR2YXIgZHQgPSAkc2NvcGUuYnVpbGRUaW1lT2JqZWN0KHJlcy5kYXRhW2ldLnNjaGVkdWxlZHRpbWUqMTAwMCk7XG5cdFx0XHRcdFx0cmVzLmRhdGFbaV0uc2NoZWR1bGVkdGltZSA9IGR0LmhvdXIgKyAnOicgKyBkdC5taW51dGVzICsgZHQuaG91clN1ZmZpeDtcblx0XHRcdFx0fVxuXHRcdFx0XHQkc2NvcGUuZGVwYXJ0dXJlcyA9IHJlcy5kYXRhO1xuXG5cblx0XHRcdFx0Ly9nZXQgdGhlIGRhdGUgYW5kIHRpbWUgb2YgaW5mb3JtYXRpb24gZnJvbSB0aW1lc3RhbXAgZmllbGRcblx0XHRcdFx0dmFyIGRhdGUgPSAkc2NvcGUuYnVpbGRUaW1lT2JqZWN0KHJlcy5kYXRhWzBdLnRpbWVzdGFtcCoxMDAwKTtcblx0XHRcdFx0JHNjb3BlLmxhc3RVcGRhdGVkID0gZGF0ZS5ob3VyICsgJzonICsgZGF0ZS5taW51dGVzICsgZGF0ZS5ob3VyU3VmZml4O1xuXHRcdFx0XHQkc2NvcGUubGFzdFVwZGF0ZWQgKz0gJyAtICcgKyBkYXRlLm1vbnRoICsgJy8nICsgZGF0ZS5kYXkgKyAnLycgKyBkYXRlLnllYXI7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRmdW5jdGlvbiBmYWlsZWQoZXJyKXtcblx0XHRcdGFsZXJ0KCdlcnJvcjogJyArIGVycik7XG5cdFx0fVxuXHQpO1xuXG5cdCRzY29wZS5idWlsZFRpbWVPYmplY3QgPSBmdW5jdGlvbih0aW1lc3RhbXApXG5cdHtcblx0XHR2YXIgZHQgPSB7fTtcblxuXHRcdHZhciBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcblxuXHRcdGR0LmhvdXIgPSBwYXJzZUludChkYXRlLmdldEhvdXJzKCkpO1xuXHRcdGlmKGR0LmhvdXIgPiAxMikge1xuXHRcdFx0ZHQuaG91ciAtPSAxMjtcblx0XHRcdGR0LmhvdXJTdWZmaXggPSBcInBtXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGR0LnN1ZmZpeCA9IFwiYW1cIjtcblx0XHR9XG5cblx0XHRkdC5tb250aCA9IGRhdGUuZ2V0TW9udGgoKSsxO1xuXHRcdGR0LmRheSA9IGRhdGUuZ2V0RGF5KCk7XG5cblx0XHRkdC5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XG5cdFx0ZHQuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuXHRcdGR0LnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cblx0XHRyZXR1cm4gZHQ7XG5cdH07XG5cbn0pOyIsIlxuYW5ndWxhci5tb2R1bGUoJ2RlcGFydHVyZXMnKVxuXHQuZmFjdG9yeSgnZGVwYXJ0dXJlU3ZjJywgZnVuY3Rpb24oJGh0dHApe1xuXHRcdHJldHVybiB7XG5cdFx0XHRnZXREZXBhcnR1cmVzOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvZGVwYXJ0dXJlcycpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
