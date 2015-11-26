'use strict';
angular.module('main')
	.controller('MainMenuCtrl', function ($log, $scope) {

		$log.log('Hello from your Controller: MainMenuCtrl in module main:. This is your controller:', this);
		$scope.makeNavOrange = function () {
			$scope.$parent.navColor = 1;
			$scope.$parent.serviceName = 'Dental';
		}
		$scope.makeNavGreen = function () {
			$scope.$parent.navColor = 2;
			$scope.$parent.serviceName = 'Medical';
		}
		$scope.makeNavYellow = function () {
			$scope.$parent.navColor = 3;
			$scope.$parent.serviceName = 'Optical';
		}
		$scope.makeNavPurple = function () {
			$scope.$parent.navColor = 4;
		}
		$scope.makeNavRed = function () {
			$scope.$parent.navColor = 5;
		}
	});
