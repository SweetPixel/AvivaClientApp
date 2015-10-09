avivaApp.controller('loginCtrl', function ($scope, $location, loginService) {
	$scope.credentials = {
		username: '',
		password: ''
	}
	$scope.status = '';
	$scope.login = function () {
		$scope.ASyncStarted = true;
		$scope.promise = loginService.login($scope.credentials);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			$scope.ASyncStarted = false;
			if($scope.status.Status == true) {
				$location.path('/services');
			}
			
		})
	}
});