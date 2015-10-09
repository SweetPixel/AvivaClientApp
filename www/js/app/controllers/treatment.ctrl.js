avivaApp.controller('treatmentCtrl', function ($scope, treatmentService) {
	$scope.treatments = [{
			allowancedate: '...',
			allowancelimit: '...',
			allowanceused: '...'
		}];

	$scope.loadingDone = false;
	
	$scope.promise = treatmentService.getTreatments($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.treatments = payload.treatments;
	})
})