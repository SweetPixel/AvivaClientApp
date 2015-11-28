'use strict';
angular.module('main')
	.controller('AdviceCtrl', function ($log, $scope, DataService, $ionicHistory, $ionicLoading) {
		$scope.question = {
			'username': $scope.$parent.userId,
			'advice': ''
		};
		$log.log('Hello from your Controller: AdviceCtrl in module main:. This is your controller:', this);
		$scope.submit = function () {
			$scope.asyncStarted = true;
			if ($scope.question.advice !== '') {
				$scope.promise = DataService.postData('', $scope.$parent.serviceName, '', 'advice', $scope.question);
				$scope.promise.then(function (payload) {
					$scope.status = payload.data;
					console.log('Got Response: ' + $scope.status);
					if ($scope.status === true) {
						$ionicLoading.show({
							template: 'Qestion received. Thank you.',
							noBackdrop: true,
							duration: 2000
						});
						$scope.asyncStarted = false;
						$ionicHistory.goBack();
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
				alert('Please write something in the textbox.');
			}
		}
	});
