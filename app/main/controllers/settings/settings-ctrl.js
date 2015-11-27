'use strict';
angular.module('main')
	.controller('SettingsCtrl', function ($log, $scope, DataService, SaveStuffService, $ionicModal) {

		$log.log('Hello from your Controller: SettingsCtrl in module main:. This is your controller:', this);
		$scope.data = {
			notific: '',
			username: $scope.$parent.userId
		};
		$scope.stuff = {
			indicator: ''
		}
		$ionicModal.fromTemplateUrl('toggle-notification.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function () {
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.modal.hide();
		};
		$scope.promise = SaveStuffService.getStoredData('toggleNotification', '');
		$scope.promise.then(function (payload) {
			$scope.stuff.indicator = payload.data;
			if ($scope.stuff.indicator) {
				console.log("Got Response: " + $scope.stuff.indicator);
				$scope.loadingDone = true;
			}
		});
		$scope.getPromise = DataService.getData($scope.$parent.userId, '', '', 'checkIfNotificationsOn');
		$scope.getPromise.then(function (payload) {
			$scope.stuff.indicator = payload.data;
			console.log("Got Response: " + $scope.stuff.indicator);
			$scope.loadingDone = true;
		})

		//Toggle notification indicator
		$scope.setNotification = function () {
			if ($scope.stuff.indicator == '1') {
				console.log("Was 1");
				$scope.data.notific = true;
			} else {
				console.log("Was 0");
				$scope.data.notific = false;
			}
			$scope.promise = DataService.postData('', '', '', 'toggleNotifications', $scope.data);
			$scope.promise.then(function (payload) {
				$scope.status = payload.data;
				SaveStuffService.setStoredData('toggleNotifications', $scope.stuff.indicator, '');
				console.log("Set notifications: " + $scope.status);
			});
		}
	});
