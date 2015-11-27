'use strict';
angular.module('main')
	.controller('PersonalDetailsCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: PersonalDetailsCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('user', '');
		$scope.promise.then(function (payload) {
			$scope.user = payload.data;
			if ($scope.user) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData($scope.$parent.userId, '', '', 'personalDetails');
		$scope.promise.then(function (payload) {
			$scope.user = payload.data;
			$scope.user.Dob = new Date($scope.user.Dob);
			$scope.loadingDone = true;
			SaveStuffService.setPersonalDetails($scope.user);
			SaveStuffService.setStoredData('user', $scope.user, '');
		});
	});
