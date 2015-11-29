'use strict';
angular.module('main')
	.controller('LogoutCtrl', function ($log, $scope, SaveStuffService, $state, $ionicHistory) {

		$log.log('Hello from your Controller: LogoutCtrl in module main:. This is your controller:', this);
		$scope.$parent.userId = '';
		SaveStuffService.setStoredData('userId', '', '');
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache();
		$state.go('withoutNav.login');
	});
