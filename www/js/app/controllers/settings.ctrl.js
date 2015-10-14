avivaApp.controller('settingsCtrl', function ($http, $scope, $location, settingsService) {
	$scope.$parent.service = 4;
	$scope.$parent.navbarClass = "settings-navbar";
	$scope.loadingDone = false;
	$scope.getPromise = settingsService.getNotificationIndicator($scope.$parent.userId);
	$scope.getPromise.then(function (payload) {
		$scope.indicator = payload.indicator;
		console.log("Got indicator: " + $scope.indicator);
		$scope.loadingDone = true;
	})

	//Toggle notification indicator
	$scope.setNotification = function () {
		$scope.promise = settingsService.setNotifications($scope.indicator, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.status = payload.status;
			console.log("Set notifications: " + $scope.status);
		});
	}
});