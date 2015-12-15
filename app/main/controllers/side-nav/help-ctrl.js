'use strict';
angular.module('main')
	.controller('HelpCtrl', function ($log, $scope, DataService, $state, $ionicLoading) {

		$log.log('Hello from your Controller: HelpCtrl in module main:. This is your controller:', this);
		$scope.data = {
			'username': $scope.$parent.userId,
			'help': ''
		};
		$scope.submit = function () {
			$scope.asyncStarted = true;
			if ($scope.data.help !== '') {
				$scope.promise = DataService.postData('', $scope.$parent.serviceName, '', 'support', $scope.data);
				$scope.promise.then(function (payload) {
					$scope.status = payload.data;
					console.log('Got Response: ' + $scope.status);
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'We\'ll get back to you soon.',
							noBackdrop: true,
							duration: 2000
						});
						$scope.asyncStarted = false;
						$state.go('main.menu');
					} else {
						$ionicLoading.show({
							template: 'Something went wrong. Please check your connection.',
							noBackdrop: true,
							duration: 3000
						});
						$scope.asyncStarted = false;
					}
				})
			} else {
				$scope.asyncStarted = false;
				sweetAlert('Missing...', 'Please write something in the textbox.', 'error');
			}
		}
	});
