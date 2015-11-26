'use strict';
angular.module('main')
	.controller('MenuCtrl', function ($log, $scope) {

		$log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);
		$scope.makeNavPurple = function () {
			$scope.navColor = 4;
		}
		$scope.makeNavRed = function () {
			$scope.navColor = 5;
		}
		$scope.userId = 'test@test.com';
	});
