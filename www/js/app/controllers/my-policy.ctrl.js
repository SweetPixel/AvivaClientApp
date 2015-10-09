avivaApp.controller('myPolicyCtrl', function ($scope, myPolicyService) {
	$scope.policy = {
		allowancedate: '...',
		allowancelimit: '...',
		allowanceused: '...'
	};
	$scope.loadingDone = false;
	
	$scope.promise = myPolicyService.getPolicy($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		$scope.policy = payload.policy;
	})
})