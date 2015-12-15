'use strict';
angular.module('main')
	.controller('NotificationsCtrl', function ($log, $scope, DataService, $ionicModal) {

		$log.log('Hello from your Controller: NotificationsCtrl in module main:. This is your controller:', this);
		$ionicModal.fromTemplateUrl('notification-detail.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function (notifId) {
			for (var i = 0; i < $scope.notifications.length; i++) {
				if ($scope.notifications[i].Notificationid === notifId) {
					$scope.oneNotification = $scope.notifications[i];
				}
			}
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.makeSeen();
			$scope.modal.hide();
		};
		$scope.$parent.notificationsPromise.then(function () {
			$scope.notifications = $scope.$parent.notifications;
			$scope.notificationCount = $scope.$parent.notificationCount;
		});
		$scope.seenNotifications = [{
			'Notificationid': '',
			'username': $scope.$parent.userId
		}];
		$scope.makeSeen = function () {
			var data = {
				'id': $scope.oneNotification.Notificationid,
				'username': $scope.$parent.userId
			}
			$scope.oneNotification.viewed = true;
			$scope.makeSeenPromise = DataService.postData('', '', '', 'makeNotificationSeen', data);
			$scope.makeSeenPromise.then(function (payload) {
				console.log('Got Response: ' + payload.data);
			});
		}
	});
