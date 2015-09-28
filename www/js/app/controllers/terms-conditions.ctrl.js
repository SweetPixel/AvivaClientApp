avivaApp('termsConditionsCtrl', function ($http, $scope, termsService) {
	$scope.terms = "Getting terms and conditions...";

	$scope.promise = termsService.getTerms();
	$scope.promise.then(function (payload) {
		$scope.terms = payload.terms;
	})
});