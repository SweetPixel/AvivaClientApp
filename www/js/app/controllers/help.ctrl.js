avivaApp.controller('helpCtrl', function ($http, $scope, helpService) {
	$scope.data = {
		help: '',
		username: $scope.$parent.userId
	};
	$scope.loadingDone = true;
	$scope.submit = function () {
		$scope.ASyncStarted = true;
		$scope.promise = helpService.getHelp($scope.data);
		$scope.data.help = '';
		$scope.promise.then(function (payload) {
			$scope.ASyncStarted = false;
			$scope.status = payload.status;
			Materialize.toast('Someone will get to you soon.', 2000);
			$scope.$parent.back();
			console.log($scope.status);
		});
	};
})