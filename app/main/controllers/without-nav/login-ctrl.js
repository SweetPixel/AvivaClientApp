'use strict';
angular.module('main')
	.controller('LoginCtrl', function ($log, $scope, $state, DataService, SaveStuffService, $ionicHistory) {

		$log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);
		$scope.credentials = {
			username: '',
			password: ''
		}
		$scope.$parent.userId = '';
		$scope.promise = SaveStuffService.getStoredData('userId', '');
		$scope.promise.then(function (payload) {
			$scope.$parent.userId = payload.data;
			console.log($scope.$parent.userId);
			if ($scope.$parent.userId) {
				console.log('userId found in localstorage');
				$state.go('main.menu');
			}
		})
		$scope.status = '';
		$scope.login = function () {
			$scope.loadingDone = false;
			$scope.promise = DataService.postData('', '', '', 'login', $scope.credentials);
			console.log("Logging in");
			$scope.promise.then(function (payload) {
				$scope.status = payload.data;
				$scope.loadingDone = true;
				if ($scope.status.Status == true) {
					$scope.$parent.userId = $scope.credentials.username;
					console.log($scope.$parent.userId);
					SaveStuffService.setStoredData('userId', $scope.$parent.userId, '');
					console.log("Logged In.");
					$state.go('main.menu');
				} else {
					sweetAlert("Oops...", "Wrong username or password.", "error");
				}

			})
		}
	});
