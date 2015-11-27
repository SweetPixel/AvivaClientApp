'use strict';
angular.module('main')
	.controller('SupportCtrl', function ($log) {

		$log.log('Hello from your Controller: SupportCtrl in module main:. This is your controller:', this);
		/*$scope.promise = SaveStuffService.getStoredData('support');
		$scope.promise.then(function (payload) {
			$scope.support = payload.data;
		});
		$scope.promise = DataService.getData('', '', '', 'support');
		$scope.promise.then(function (payload) {
			$scope.support = payload.data;
			SaveStuffService.setStoredData('support', $scope.support);
		});*/
	});
