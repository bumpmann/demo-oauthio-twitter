var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/timeline', {
		templateUrl: 'partials/timeline.html',
		controller: 'timelineCtrl'
	}).when('/connect', {
		templateUrl: 'partials/connect.html',
		controller: 'connectCtrl'
	}).otherwise({
		redirectTo: '/connect'
	});
	$locationProvider.html5Mode(false);
});


demoApp.controller('connectCtrl', function connectCtrl($scope, $rootScope, $location) {
	OAuth.initialize("~~~[[YOUR_OAUTH_IO_PUBLIC_KEY]]~~~");
	$scope.connect = function() {
		OAuth.popup("twitter", function(err, res) {
			if (err) return alert(err);
			$rootScope.twitter = res;
			$location.path('/timeline');
			$scope.$apply();
		});
	}
});

demoApp.controller('timelineCtrl', function timelineCtrl($scope, $rootScope) {
	$rootScope.twitter.get('/1.1/statuses/home_timeline.json').done(function(data) {
		$scope.tw_timeline = data;
		$scope.$apply();
	});
});