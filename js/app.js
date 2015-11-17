'use strict';

angular.module('App', ['ngSanitize']) //ngSanitize for HTML displaying

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.checkBirthdate = function() {
        var today = new Date();
        var birthDate = new Date($scope.birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        $scope.userAge = age;
        if (age >= 13) {
            $scope.userForm.birthdate.$setValidity("birthdate", true);
            return false;
        } else {
            $scope.userForm.birthdate.$setValidity("birthdate", false);
            return true;
        }
    }

	$('#formSubmit').click(function() {
        $('.alert').show();
    });
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
