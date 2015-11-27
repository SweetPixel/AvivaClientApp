'use strict';
angular.module('main')
	.controller('GiveFeedbackCtrl', function ($log, $scope, DataService, $ionicHistory) {

		$log.log('Hello from your Controller: GiveFeedbackCtrl in module main:. This is your controller:', this);
		$scope.feedback = {
			Practicecc: 1,
			sentertainment: 1,
			healthcareitem: 1,
			friendlyapprochable: 1,
			comfortlevel: 1,
			happywithproduct: false
		};
		$scope.clinic = $scope.$parent.oneClinic;

		$scope.submit = function () {
			$scope.feedback.practiceid = $scope.clinic.practiceId;
			$scope.feedback.username = $scope.$parent.userId;

			$scope.feedback.Practicecc = parseInt($scope.feedback.Practicecc, 10);
			$scope.feedback.sentertainment = parseInt($scope.feedback.sentertainment, 10);
			$scope.feedback.healthcareitem = parseInt($scope.feedback.healthcareitem, 10);
			$scope.feedback.friendlyapprochable = parseInt($scope.feedback.friendlyapprochable, 10);
			$scope.feedback.comfortlevel = parseInt($scope.feedback.comfortlevel, 10);
			$scope.feedback.serviceType = $scope.$parent.serviceName;
			if ($scope.feedback.happywithproduct === '2') {
				$scope.feedback.happywithproduct = true;
			} else if ($scope.feedback.happywithproduct === '1') {
				$scope.feedback.happywithproduct = false;
			}
			console.log($scope.feedback);
			$scope.promise = DataService.postData('', $scope.$parent.serviceName, '', 'postFeedback', $scope.feedback);
			$scope.promise.then(function (payload) {
				console.log("Got Response: " + payload.data);
				$ionicHistory.goBack();
			})
		}
	});
