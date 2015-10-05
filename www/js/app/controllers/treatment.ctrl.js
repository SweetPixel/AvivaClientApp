avivaApp.controller('treatmentCtrl', function ($scope, treatmentService) {
	$scope.treatments = [{
			allowancedate: '...',
			allowancelimit: '...',
			allowanceused: '...'
		}];
	
	$scope.promise = treatmentService.getTreatments($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.treatments = payload.treatments;
	})
})