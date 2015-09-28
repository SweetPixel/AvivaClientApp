avivaApp.controller('myClaimsCtrl', function ($http, $scope, myClaimsService) {
	$scope.claims = {};
	$scope.promise = myClaimsService.getClaims();
	$scope.promise.then(function (payload) {
		$scope.claims = payload.claims;
	})
})