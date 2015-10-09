avivaApp.controller('myClaimsCtrl', function ($http, $scope, myClaimsService) {
	$scope.claims = {};
	$scope.loadingDone = false;
	console.log("getting claim: " + $scope.$parent.service);
	$scope.promise = myClaimsService.getClaims($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		console.log("Got claim");
		$scope.claims = payload.claims;
	})
})