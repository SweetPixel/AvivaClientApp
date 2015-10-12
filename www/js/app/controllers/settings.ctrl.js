avivaApp.controller('settingsCtrl', function ($http, $scope, $location, settingsService) {
	$scope.$parent.service = 4;
	$scope.$parent.navbarClass = "settings-navbar";
	$scope.setNotification = function () {
		console.log("doing");
		$scope.promise = settingsService.setNotifications($scope.indicator, $scope.$parent.userId);
		$scope.promise.then(function (payload) {
			$scope.status = payload.data;
			console.log("Set notifications: " + $scope.status);
		});
	}
});