'use strict';
angular.module('main')
	.controller('ChangePasswordCtrl', function ($log, $scope, DataService, $ionicHistory) {
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
					$scope.loadingDone = true;
					console.log('Got Response: ' + payload.data);
					if (payload.data === true) {
						$ionicHistory.goBack();
					} else {
						alert('Old password is not correct.');
					}
				});
			}
		}
	});
