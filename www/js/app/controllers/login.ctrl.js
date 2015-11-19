avivaApp.controller('loginCtrl', function ($scope, $location, loginService) {
	$scope.credentials = {
		username: '',
		password: ''
	}
	$scope.status = '';
	$scope.login = function () {
		// ProgressIndicator.showSimple(true);
		$scope.ASyncStarted = true;
		$scope.promise = loginService.login($scope.credentials);
		console.log("Logging in");
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			$scope.ASyncStarted = false;
			$scope.$parent.userId = $scope.credentials.username;
			$scope.$parent.checkNotifications();
			console.log("received");
			// ProgressIndicator.hide();
			if($scope.status.Status == true) {
				$location.path('/services');
			}
			
		})
	}
});