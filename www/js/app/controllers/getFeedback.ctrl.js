avivaApp.controller('getFeedbackCtrl', function($http, $scope, feedbackService, $routeParams) {
	$scope.loadingDone = false;
	$scope.practiceId = $routeParams.param;
	$scope.$parent.promise.then(function () {
		$.each($scope.$parent.clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
			}
		});
		$scope.loadingDone = true;
	});
	$scope.getFeedbackPromise = feedbackService.getFeedbacks($scope.$parent.userId, $scope.practiceId, $scope.$parent.service);
	$scope.getFeedbackPromise.then(function (payload) {
		$scope.feedbacks = payload.feedbacks;
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
		}
		else {
			var total = $scope.feedbacks.Practicecc + $scope.feedbacks.sentertainment + $scope.feedbacks.healthcareitem + $scope.feedbacks.friendlyapprochable + $scope.feedbacks.comfortlevel;
			if ($scope.feedbacks.happywithproduct) {
				total = total + 5;
			}
			var mean = total / 6;
			$scope.totalScore = Math.floor(mean);
			console.log( "Should show: " + $scope.totalScore);
			$scope.isArray = false;
		}
	});
})