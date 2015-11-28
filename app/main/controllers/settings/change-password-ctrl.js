'use strict';
angular.module('main')
	.controller('ChangePasswordCtrl', function ($log, $scope, DataService, $ionicHistory, $ionicLoading) {
		$scope.data = {
			username: $scope.$parent.userId,
			oldpassword: '',
			newpassword: '',
			confirmpassword: ''
		};
		$log.log('Hello from your Controller: ChangePasswordCtrl in module main:. This is your controller:', this);
		$scope.update = function () {
			if ($scope.data.newpassword !== $scope.data.confirmpassword) {
				alert('New and confirm password do not match.');
			} else {
				$scope.loadingDone = false;
				$scope.promise = DataService.postData('', '', '', 'changePassword', $scope.data);
				$scope.promise.then(function (payload) {
					$scope.status = payload.data;
					console.log('Got Response: ' + $scope.status);
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'Password updated.',
							noBackdrop: true,
							duration: 2000
						});
						$scope.loadingDone = true;
						$ionicHistory.goBack();
					} else {
						$ionicLoading.show({
							template: 'Old password not correct.',
							noBackdrop: true,
							duration: 3000
						});
						$scope.loadingDone = true;
					}
				});
			}
		}
	});
