avivaApp.controller('feedbackCtrl', function($http, $scope, feedbackService, $routeParams) {
	$scope.feedback = {};
	$scope.practiceId = $routeParams.param;
	console.log("getting feedback: " + $scope.$parent.service);
	$scope.loadingDone = false;
	$scope.$parent.promise.then(function () {
		$.each($scope.$parent.clinics, function (index, item) {
			if (item.practiceId == $scope.practiceId) {
				$scope.clinic = item;
			}
		});
		$scope.loadingDone = true;
	});
	$scope.submit = function () {
		$scope.feedback.practiceid = $scope.clinic.practiceId;
		$scope.feedback.username = $scope.$parent.userId;
		
		$scope.feedback.Practicecc = parseInt($scope.feedback.Practicecc, 10);
		$scope.feedback.sentertainment = parseInt($scope.feedback.sentertainment, 10);
		$scope.feedback.healthcareitem = parseInt($scope.feedback.healthcareitem, 10);
		$scope.feedback.friendlyapprochable = parseInt($scope.feedback.friendlyapprochable, 10);
		$scope.feedback.comfortlevel = parseInt($scope.feedback.comfortlevel, 10);
		$scope.feedback.practiceid = parseInt($scope.feedback.practiceid, 10);
		if ($scope.feedback.happywithproduct == "true") {
			$scope.feedback.happywithproduct = true;
		}
		else {
			$scope.feedback.happywithproduct = false;
		}
		$scope.promise = feedbackService.postFeedback($scope.feedback, $scope.$parent.service);
		$scope.promise.then(function (payload) {
			console.log("Feedback status: " + payload.status);
			$scope.$parent.back();
		})
	}
})