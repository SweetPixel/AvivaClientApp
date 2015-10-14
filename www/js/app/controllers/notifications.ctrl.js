avivaApp.controller('notificationsCtrl', function ($http, $scope, notificationsService, $timeout) {
	$scope.$parent.service = 5;
	$scope.$parent.navbarClass = "notifications-navbar";
	$scope.loadingDone = false;
	$scope.$parent.notificationsPromise.then(function () {
		$scope.loadingDone = true;
		$scope.notifications = $scope.$parent.notifications;
		$scope.notificationCount = $scope.$parent.notificationCount;
	});
	$scope.seenNotifications = [{
		'id': '',
		'username': $scope.$parent.userId
	}];
	$timeout(function () {
		$scope.makeSeenPromise = notificationsService.makeSeen();
		$scope.makeSeenPromise.then(function (payload) {
			console.log(payload.status);
		});
	}, 5000);
	
})