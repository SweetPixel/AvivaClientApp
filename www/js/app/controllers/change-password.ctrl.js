avivaApp.controller('changePasswordCtrl', function ($http, changePasswordService, $location, $scope) {
	$scope.data = {
		username: $scope.$parent.userId,
		oldpassword: '',
		newpassword: ''
	};
	$scope.submit = function () {
		$scope.ASyncStarted = true;
		$scope.promise = changePasswordService.changePassword($scope.data);
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			console.log("Response: " + payload.status);
			Materialize.toast('Password has been changed', 2000)
			$scope.$parent.back();
		})
	}
})