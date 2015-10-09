avivaApp.controller('termsConditionsCtrl', function ($http, $scope, termsService) {
	$scope.terms = "Getting terms and conditions...";
	$scope.loadingDone = false;
	$scope.promise = termsService.getTerms();
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.terms = payload.terms;
	})
});