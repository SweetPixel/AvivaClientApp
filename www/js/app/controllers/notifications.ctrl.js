avivaApp.controller('notificationsCtrl', function ($http, $scope, notificationsService) {
	$scope.$parent.service = 5;
	$scope.$parent.navbarClass = "notifications-navbar";
	$scope.notifications = {};
	$scope.loadingDone = false;
	$scope.promise = notificationsService.getNotifications($scope.$parent.userId, $scope.$parent.service);
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		console.log("Got notifications");
		$scope.notifications = payload.notifications;
	})
})