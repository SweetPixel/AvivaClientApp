'use strict';
angular.module('main')
	.controller('TermsCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: TermsCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('terms', '');
		$scope.promise.then(function (payload) {
			$scope.terms = payload.data;
			if ($scope.terms) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData('', '', '', 'terms');
		$scope.promise.then(function (payload) {
			$scope.terms = payload.data;
			$scope.loadingDone = true;
			SaveStuffService.setStoredData('terms', $scope.terms, '');
		});
	});
