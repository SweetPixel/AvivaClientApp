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
		console.log("makeseen called");
		$scope.makeSeenPromise = notificationsService.makeSeen($scope.$parent.userId);
		$scope.makeSeenPromise.then(function (payload) {
			console.log(payload.status);
		});
	}, 5000);
	
})