avivaApp.controller('staffCtrl', function ($scope, staffService) {
	$scope.staff = [{
			FirstName: '...',
			JobTitle: '...',
			GDCNumber: '...'
		}];
	$scope.loadingDone = false;
	$scope.promise = staffService.getStaff($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		$scope.staff = payload.staff;
		$scope.loadingDone = true;
	})
})