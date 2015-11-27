'use strict';
angular.module('main')
	.controller('PolicyCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: PolicyCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('policy', $scope.$parent.serviceName);
		$scope.promise.then(function (payload) {
			$scope.policy = payload.data;
			if ($scope.policy) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData($scope.$parent.userId, $scope.$parent.serviceName, '', 'policy');
		$scope.promise.then(function (payload) {
			$scope.policy = payload.data;
			$scope.loadingDone = true;
			SaveStuffService.setStoredData('policy', $scope.policy, $scope.$parent.serviceName);
		});
	});
