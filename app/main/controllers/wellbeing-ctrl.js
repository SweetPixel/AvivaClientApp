'use strict';
angular.module('main')
	.controller('WellbeingCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: WellbeingCtrl in module main:. This is your controller:', this);
		$scope.promise = SaveStuffService.getStoredData('articles', $scope.$parent.serviceName);
		$scope.promise.then(function (payload) {
			$scope.articles = payload.data;
			if ($scope.articles) {
				$scope.loadingDone = true;
			}
		});
		$scope.promise = DataService.getData($scope.$parent.userId, $scope.$parent.serviceName, '', 'wellbeing');
		$scope.promise.then(function (payload) {
			$scope.articles = payload.data;
			$scope.loadingDone = true;
			SaveStuffService.setStoredData('articles', $scope.articles, $scope.$parent.serviceName);
		});

	});
