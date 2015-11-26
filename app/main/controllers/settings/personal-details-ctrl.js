'use strict';
angular.module('main')
	.controller('PersonalDetailsCtrl', function ($log, $scope, DataService, PersonalDetailsService) {

		$log.log('Hello from your Controller: PersonalDetailsCtrl in module main:. This is your controller:', this);
		$scope.promise = DataService.getData($scope.$parent.userId, '', '', 'personalDetails');
		$scope.promise.then(function (payload) {
			$scope.user = payload.data;
			$scope.user.Dob = new Date($scope.user.Dob);
			PersonalDetailsService.setPersonalDetails($scope.user);
		});
	});
