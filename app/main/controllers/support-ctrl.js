'use strict';
angular.module('main')
	.controller('SupportCtrl', function ($log, $scope, SaveStuffService, DataService) {

		$log.log('Hello from your Controller: SupportCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('helpSupport');
		$scope.promise.then(function (payload) {
			$scope.support = payload.data;
		});
		$scope.promise = DataService.getData('', '', '', 'helpSupport');
		$scope.promise.then(function (payload) {
			$scope.support = payload.data;
			SaveStuffService.setStoredData('helpSupport', $scope.support);
		});
	});
