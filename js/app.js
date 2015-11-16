'use strict';

angular.module('App', ['ngSanitize']) //ngSanitize for HTML displaying

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {
	var startdate = new Date();
	var daysToSubtract = 365.25*13-1;
	startdate.setDate(startdate.getDate()-daysToSubtract);
		$scope.youngest=startdate;

	$('#formSubmit').click(function() {
        $('.alert').show()
    }) 
}])

.directive('nxEqualEx', function() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqualEx) {
                console.error('nxEqualEx expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqualEx, function (value) {
                // Only compare values if the second ctrl has a value.
                if (model.$viewValue !== undefined && model.$viewValue !== '') {
                    model.$setValidity('nxEqualEx', value === model.$viewValue);
                }
            });
            model.$parsers.push(function (value) {
                // Mute the nxEqual error if the second ctrl is empty.
                if (value === undefined || value === '') {
                    model.$setValidity('nxEqualEx', true);
                    return value;
                }
                var isValid = value === scope.$eval(attrs.nxEqualEx);
                model.$setValidity('nxEqualEx', isValid);
                return isValid ? value : undefined;
            });
        }
    };
});