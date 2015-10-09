avivaApp.controller('personalDetailsCtrl', function ($http, $scope, $location, getPersonalService, updatePersonalService) {
	$scope.user = {
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: ''
	};
	$scope.loadingDone = false;
	$scope.promise = getPersonalService.getDetails($scope.$parent.userId);
	$scope.promise.then(function (payload) {
		console.log("Should be done");
		$scope.user = payload.data;
		$scope.user.Dob = new Date($scope.user.Dob);
		$scope.loadingDone = true;
	});
	$scope.updateDetails = function () {
		$scope.ASyncStarted = true;
		$scope.user.ID = 14;
		$scope.user.Dob = $scope.user.Dob.toString();
		$scope.user.UserName = $scope.$parent.userId;
		$scope.promise = updatePersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			console.log("Response: " + payload.data);
			/*$location.path('/settings/personal-details');*/
			$scope.$parent.back();
		});
	}

});