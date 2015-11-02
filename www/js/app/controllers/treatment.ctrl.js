avivaApp.controller('treatmentCtrl', function ($scope, treatmentService, $routeParams) {
	$scope.practiceId = $routeParams.param;
	$scope.loadingDone = false;
	$scope.message = false;
	$scope.promise = treatmentService.getTreatments($scope.practiceId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.treatments = payload.treatments;
		if ($scope.treatments.length == 0) {
			$scope.message = "No treatments found for this practice.";
		}
		else {
			$scope.message = false;
		}
	})
})