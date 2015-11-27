'use strict';
angular.module('main')
	.controller('NotificationsCtrl', function ($log, $scope, DataService) {

		$log.log('Hello from your Controller: NotificationsCtrl in module main:. This is your controller:', this);
		$scope.$parent.notificationsPromise.then(function () {
			$scope.notifications = $scope.$parent.notifications;
			$scope.notificationCount = $scope.$parent.notificationCount;
		});
		$scope.seenNotifications = [{
			'Notificationid': '',
			'username': $scope.$parent.userId
		}];
		$scope.makeSeen = function (id) {
			$scope.seenNotifications.Notificationid = id;
			$scope.makeSeenPromise = DataService.postData('', '', '', 'makeNotificationSeen', $scope.seenNotifications);
			$scope.makeSeenPromise.then(function (payload) {
				console.log('Got Response: ' + payload.data);
			});
		}
	});
