avivaApp.controller('myPolicyCtrl', function ($scope, myPolicyService) {
	$scope.policy = {
		allowancedate: '...',
		allowancelimit: '...',
		allowanceused: '...'
	};
	
	$scope.promise = myPolicyService.getPolicy($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Got claim");
		$scope.policy = payload.policy;
	})
})