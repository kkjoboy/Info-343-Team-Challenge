'use strict';

angular.module('App', ['ngSanitize']) //ngSanitize for HTML displaying

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {
	var startdate = new Date();
	var daysToSubtract = 365.25*13-1;
	startdate.setDate(startdate.getDate()-daysToSubtract);
		$scope.youngest=startdate;

}

]);