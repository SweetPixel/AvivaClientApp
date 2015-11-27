'use strict';
angular.module('main')
	.controller('QrCtrl', function ($log, $scope, $ionicHistory, SaveStuffService, DataService) {

		$log.log('Hello from your Controller: QrCtrl in module main:. This is your controller:', this);
		$scope.promise = DataService.getData($scope.$parent.userId, '', '', 'qr');
		$scope.promise.then(function (payload) {
			$scope.loadingDone = true;
			$scope.qr = payload.data;
		});
	});
