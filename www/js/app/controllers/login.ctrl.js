avivaApp.controller('loginCtrl', function ($scope, $location, loginService) {
	$scope.credentials = {
		username: '',
		password: ''
	}
	$scope.status = '';
	$scope.login = function () {
		$scope.promise = loginService.login($scope.credentials);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			if($scope.status.Status == true) {
				$location.path('/services');
			}
			
		})
	}
});