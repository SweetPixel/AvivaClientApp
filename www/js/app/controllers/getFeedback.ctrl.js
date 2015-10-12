avivaApp.controller('getFeedbackCtrl', function($http, $scope, feedbackService, $routeParams) {
	$scope.feedback = {};
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
	/*$scope.promise = feedbackService.getFeedbacks($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got feedback");
		$scope.feedback = payload.feedback;
	})*/
})