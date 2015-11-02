avivaApp.controller('timingCtrl', function ($http, $scope, timingService, $routeParams) {
	$scope.loadingDone = false;
	$scope.practiceId = $routeParams.param;
	$scope.promise = timingService.getTiming($scope.$parent.service, $scope.practiceId);
	$scope.promise.then(function (payload) {
		console.log("Got practice timing");
		$scope.practice = payload.practice;
		$scope.loadingDone = true;
		if ($scope.practice !== null) {
			$scope.hasTiming = true;
		}
		else {
			$scope.hasTiming = false;
		}
	});
})