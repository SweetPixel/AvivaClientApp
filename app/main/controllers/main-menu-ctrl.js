'use strict';
angular.module('main')
	.controller('MainMenuCtrl', function ($log, $scope, DataService, SaveStuffService) {

		$log.log('Hello from your Controller: MainMenuCtrl in module main:. This is your controller:', this);
		$scope.makeNavOrange = function () {
			$scope.$parent.navColor = 1;
			$scope.$parent.serviceName = 'Dental';
			$scope.$parent.doctor = 'Dentist';
			$scope.getClinics();
		}
		$scope.makeNavGreen = function () {
			$scope.$parent.navColor = 2;
			$scope.$parent.serviceName = 'Medical';
			$scope.$parent.doctor = 'Doctor';
			$scope.getClinics();
		}
		$scope.makeNavYellow = function () {
			$scope.$parent.navColor = 3;
			$scope.$parent.serviceName = 'Optical';
			$scope.$parent.doctor = 'Optician';
			$scope.getClinics();
		}
		$scope.makeNavPurple = function () {
			$scope.$parent.navColor = 4;
		}
		$scope.makeNavRed = function () {
			$scope.$parent.navColor = 5;
		}
		$scope.getClinics = function () {
			$scope.$parent.getStoredDataPromise = SaveStuffService.getStoredData('practice', $scope.$parent.serviceName);
			$scope.$parent.getStoredDataPromise.then(function (payload) {
				$scope.$parent.clinics = payload.data;
				console.log($scope.$parent.serviceName + ' practices found from localStorage: ' + $scope.$parent.clinics.length);
			});
			$scope.$parent.getServerDataPromise = DataService.getData('', $scope.$parent.serviceName, '', 'practice');
			$scope.$parent.getServerDataPromise.then(function (payload) {
				$scope.$parent.clinics = payload.data;
				SaveStuffService.setStoredData('practice', $scope.$parent.clinics, $scope.$parent.serviceName);
				console.log($scope.$parent.serviceName + ' practices found from server: ' + $scope.$parent.clinics.length);
			})
		}
		$scope.$parent.notificationsPromise = DataService.getData($scope.userId, '', '', 'notifications');
		$scope.$parent.notificationsPromise.then(function (payload) {
			$scope.$parent.notifications = payload.data;
			$scope.$parent.notificationCount = $scope.$parent.notifications.length;
			console.log("Got notifications: " + $scope.$parent.notificationCount);
		});

	});
