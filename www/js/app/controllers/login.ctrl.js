avivaApp.controller('loginCtrl', function ($scope, $location) {
	$scope.username;
	$scope.password;
	$scope.login = function () {
		$location.path('/services');
		/*if ($scope.username == '' && $scope.password == '') {
			
		}
		else {
			Materialize.toast("Wrong username or password.", 4000);
		}*/
	}
});