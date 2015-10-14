avivaApp.controller('myClaimsCtrl', function ($http, $scope, myClaimsService) {
	$scope.claims = {};
	$scope.loadingDone = false;
	console.log("getting claim: " + $scope.$parent.service);
	$scope.promise = myClaimsService.getClaims($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		console.log("Got claim");
		$scope.claims = payload.claims;
	});
	$scope.emailData = {
		claimid: '',
		email: ''
	};
	$scope.sendEmail = function () {
		$scope.emailPromise = myClaimsService.emailClaims($scope.emailData, $scope.$parent.service);
		$scope.emailPromise.then(function (payload) {
			Materialize.toast('Email Sent', 2000);
			$scope.$parent.back();
			console.log(payload.status);
		});
	};
	$scope.setClaimId = function (id) {
		console.log("ID is: " + id);

		$scope.emailData.claimid = id;
	};
})