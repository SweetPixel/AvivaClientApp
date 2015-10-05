avivaApp.controller('personalDetailsCtrl', function ($http, $scope, $location, getPersonalService, updatePersonalService) {
	$scope.user = {
		UserID: '',
		FirstName: '...',
		LastName : '',
		Email: '...',
		Dob: '...',
		Gender: '...'
	};
	$scope.promise = getPersonalService.getDetails($scope.user);
	$scope.promise.then(function (payload) {
		console.log("Should be done");
		$scope.user = payload.data;
		console.log($scope.user.ID);
		console.log($scope.user.UserID);
		$scope.user.Dob = new Date($scope.user.Dob);
	});
	$scope.updateDetails = function () {
		$scope.user.Dob = $scope.user.Dob.toString();
		$scope.promise = updatePersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			console.log("should be updated");
			console.log(payload.data);
			$location.path('/settings');
		});
	}

});