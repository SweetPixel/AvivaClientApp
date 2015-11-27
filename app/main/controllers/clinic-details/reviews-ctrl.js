'use strict';
angular.module('main')
	.controller('ReviewsCtrl', function ($log, $scope, DataService) {

		$log.log('Hello from your Controller: ReviewsCtrl in module main:. This is your controller:', this);
		$scope.clinic = $scope.$parent.oneClinic
		$scope.data = {
			username: $scope.$parent.userId,
			practiceid: $scope.clinic.practiceId
		}
		console.log('Data Object');
		console.log($scope.data);
		$scope.promise = DataService.postData('', 'Dental', '', 'getFeedback', $scope.data);
		$scope.promise.then(function (payload) {
			$scope.feedbacks = payload.data;
			$scope.loadingDone = true;
			if ($scope.feedbacks) {
				if ($scope.feedbacks.length > 1) {
					$.each($scope.feedbacks, function (index, item) {
						var total = item.Practicecc + item.sentertainment + item.healthcareitem + item.friendlyapprochable + item.comfortlevel;
						if (item.happywithproduct) {
							total = total + 5;
						}
						var mean = total / 6;
						item.totalScore = Math.floor(mean);
						$scope.isArray = true;
					});
				} else {
					var total = $scope.feedbacks.Practicecc + $scope.feedbacks.sentertainment + $scope.feedbacks.healthcareitem + $scope.feedbacks.friendlyapprochable + $scope.feedbacks.comfortlevel;
					if ($scope.feedbacks.happywithproduct) {
						total = total + 5;
					}
					var mean = total / 6;
					$scope.totalScore = Math.floor(mean);
					console.log('Should show: ' + $scope.totalScore);
					$scope.isArray = false;
				}
				$scope.message = false;
			} else {
				$scope.message = 'No reviews found for this practice.';
			}
		});
	});
