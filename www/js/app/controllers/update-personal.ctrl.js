avivaApp.controller('updatePersonalCtrl', function ($http, $scope, updateDetails) {
	$scope.user = {
		UserId: '',
		FirstName: '',
		LastName : '',
		Email: '',
		Dob: '',
		Gender: ''
	};
	$scope.updateDetails = function () {
		$scope.promise = getPersonalService.updateDetails($scope.user);
		$scope.promise.then(function (payload) {
			console.log("Should be done");
			$scope.user = payload.data;
		});
	}

});