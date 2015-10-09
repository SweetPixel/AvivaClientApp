avivaApp.controller('feedbackCtrl', function($http, $scope, feedbackService) {
	$scope.feedback = {};
	$scope.loadingDone = true;
	console.log("getting feedback: " + $scope.$parent.service);
	$scope.promise = feedbackService.getFeedbacks($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		console.log("Got feedback");
		$scope.feedback = payload.feedback;
	})
})