
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

	$scope.header = 2;

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
/*
    A custom directive to wrap 'stackable.js', to improve departure
    board mobile friendliness.  If the device screen is small, the
    table will collapse into a card view, which will stack on top of
    each other.
*/
angular.module('departures')
    .directive('stackableTable', function(){
        return {
            restrict: 'AE',
            scope: {
                'headers': '@',
                'columns': '@'
            },
            link: function(scope, elem, attrs){
                $(elem).cardtable();
            },
            /*template: '<ng-include src="getTemplate()"/>',
            controller: function($scope) {
                return 'templates/stackable-table.html';
            }*/
            templateUrl: 'templates/stackable-table.html'
        };
    });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVwYXJ0dXJlL21vZHVsZS5qcyIsIm1vZHVsZXMvZGVwYXJ0dXJlL2RlcGFydHVyZS1jb25maWcuanMiLCJtb2R1bGVzL2RlcGFydHVyZS9kZXBhcnR1cmUtY29udHJvbGxlci5qcyIsIm1vZHVsZXMvZGVwYXJ0dXJlL2RlcGFydHVyZS1zZXJ2aWNlLmpzIiwibW9kdWxlcy9kZXBhcnR1cmUvc3RhY2thYmxlLWRpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJywgWyd1aS5yb3V0ZXInXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2RlcGFydHVyZXMnKVxyXG5cdC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblxyXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9kZXBhcnR1cmVzJyk7XHJcblxyXG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZXBhcnR1cmVzJyx7XHJcblx0XHR1cmw6ICcvZGVwYXJ0dXJlcycsXHJcblx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9kZXBhcnR1cmVzLXZpZXcuaHRtbCdcclxuXHR9KS5zdGF0ZSgnYWJvdXQnLHtcclxuXHRcdHVybDogJy9hYm91dCcsXHJcblx0XHR0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9hYm91dC5odG1sJ1xyXG5cdH0pO1xyXG5cclxufSk7IiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJylcclxuLmNvbnRyb2xsZXIoJ2RlcGFydHVyZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsZGVwYXJ0dXJlU3ZjKXtcclxuXHJcblx0JHNjb3BlLmhlYWRlciA9IDI7XHJcblxyXG5cdGRlcGFydHVyZVN2Yy5nZXREZXBhcnR1cmVzKCkudGhlbihcclxuXHRcdGZ1bmN0aW9uIHN1Y2Nlc3MocmVzKXtcclxuXHRcdFx0aWYocmVzLmRhdGEubGVuZ3RoID4gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8vbG9vcCB0aHJvdWdoIGFuZCBhZGQgYSBiZXR0ZXIgdGltZSBmb3JtYXQgZm9yIGRpc3BsYXkgcHVycG9zZXNcclxuXHRcdFx0XHRmb3IodmFyIGk9MDsgaTxyZXMuZGF0YS5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR2YXIgZHQgPSAkc2NvcGUuYnVpbGRUaW1lT2JqZWN0KHJlcy5kYXRhW2ldLnNjaGVkdWxlZHRpbWUqMTAwMCk7XHJcblx0XHRcdFx0XHRyZXMuZGF0YVtpXS5zY2hlZHVsZWR0aW1lID0gZHQuaG91ciArICc6JyArIGR0Lm1pbnV0ZXMgKyBkdC5ob3VyU3VmZml4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkc2NvcGUuZGVwYXJ0dXJlcyA9IHJlcy5kYXRhO1xyXG5cclxuXHJcblx0XHRcdFx0Ly9nZXQgdGhlIGRhdGUgYW5kIHRpbWUgb2YgaW5mb3JtYXRpb24gZnJvbSB0aW1lc3RhbXAgZmllbGRcclxuXHRcdFx0XHR2YXIgZGF0ZSA9ICRzY29wZS5idWlsZFRpbWVPYmplY3QocmVzLmRhdGFbMF0udGltZXN0YW1wKjEwMDApO1xyXG5cdFx0XHRcdCRzY29wZS5sYXN0VXBkYXRlZCA9IGRhdGUuaG91ciArICc6JyArIGRhdGUubWludXRlcyArIGRhdGUuaG91clN1ZmZpeDtcclxuXHRcdFx0XHQkc2NvcGUubGFzdFVwZGF0ZWQgKz0gJyAtICcgKyBkYXRlLm1vbnRoICsgJy8nICsgZGF0ZS5kYXkgKyAnLycgKyBkYXRlLnllYXI7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRmdW5jdGlvbiBmYWlsZWQoZXJyKXtcclxuXHRcdFx0YWxlcnQoJ2Vycm9yOiAnICsgZXJyKTtcclxuXHRcdH1cclxuXHQpO1xyXG5cclxuXHQkc2NvcGUuYnVpbGRUaW1lT2JqZWN0ID0gZnVuY3Rpb24odGltZXN0YW1wKVxyXG5cdHtcclxuXHRcdHZhciBkdCA9IHt9O1xyXG5cclxuXHRcdHZhciBkYXRlID0gbmV3IERhdGUodGltZXN0YW1wKTtcclxuXHJcblx0XHRkdC5ob3VyID0gcGFyc2VJbnQoZGF0ZS5nZXRIb3VycygpKTtcclxuXHRcdGlmKGR0LmhvdXIgPiAxMikge1xyXG5cdFx0XHRkdC5ob3VyIC09IDEyO1xyXG5cdFx0XHRkdC5ob3VyU3VmZml4ID0gXCJwbVwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZHQuc3VmZml4ID0gXCJhbVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGR0Lm1vbnRoID0gZGF0ZS5nZXRNb250aCgpKzE7XHJcblx0XHRkdC5kYXkgPSBkYXRlLmdldERheSgpO1xyXG5cclxuXHRcdGR0Lm1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHRcdGR0LnNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuXHRcdGR0LnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG5cdFx0cmV0dXJuIGR0O1xyXG5cdH07XHJcblxyXG59KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJylcclxuXHQuZmFjdG9yeSgnZGVwYXJ0dXJlU3ZjJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Z2V0RGVwYXJ0dXJlczogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCcvZGVwYXJ0dXJlcycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7IiwiLypcclxuICAgIEEgY3VzdG9tIGRpcmVjdGl2ZSB0byB3cmFwICdzdGFja2FibGUuanMnLCB0byBpbXByb3ZlIGRlcGFydHVyZVxyXG4gICAgYm9hcmQgbW9iaWxlIGZyaWVuZGxpbmVzcy4gIElmIHRoZSBkZXZpY2Ugc2NyZWVuIGlzIHNtYWxsLCB0aGVcclxuICAgIHRhYmxlIHdpbGwgY29sbGFwc2UgaW50byBhIGNhcmQgdmlldywgd2hpY2ggd2lsbCBzdGFjayBvbiB0b3Agb2ZcclxuICAgIGVhY2ggb3RoZXIuXHJcbiovXHJcbmFuZ3VsYXIubW9kdWxlKCdkZXBhcnR1cmVzJylcclxuICAgIC5kaXJlY3RpdmUoJ3N0YWNrYWJsZVRhYmxlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0FFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgICdoZWFkZXJzJzogJ0AnLFxyXG4gICAgICAgICAgICAgICAgJ2NvbHVtbnMnOiAnQCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHJzKXtcclxuICAgICAgICAgICAgICAgICQoZWxlbSkuY2FyZHRhYmxlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qdGVtcGxhdGU6ICc8bmctaW5jbHVkZSBzcmM9XCJnZXRUZW1wbGF0ZSgpXCIvPicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0ZW1wbGF0ZXMvc3RhY2thYmxlLXRhYmxlLmh0bWwnO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvc3RhY2thYmxlLXRhYmxlLmh0bWwnXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
