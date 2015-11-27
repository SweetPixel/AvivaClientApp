'use strict';
angular.module('main')
	.controller('AdviceCtrl', function ($log, $scope, DataService, $ionicHistory) {
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
					$scope.asyncStarted = false;
					$ionicHistory.goBack();
				})
			} else {
				alert('Please write something in the textbox.');
			}
		}
	});
