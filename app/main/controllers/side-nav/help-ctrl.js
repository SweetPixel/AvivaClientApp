'use strict';
angular.module('main')
	.controller('HelpCtrl', function ($log, $scope, DataService, $state) {

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
					$scope.asyncStarted = false;
					$state.go('main.menu');
				})
			} else {
				alert('Please write something in the textbox.');
			}
		}
	});
