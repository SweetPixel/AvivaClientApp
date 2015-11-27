'use strict';
angular.module('main')
	.controller('BookingCtrl', function ($log, $scope, DataService) {

		$log.log('Hello from your Controller: BookingCtrl in module main:. This is your controller:', this);
		$scope.promise = DataService.getData('', '', '', 'booking');
		$scope.promise.then(function (payload) {
			console.log("Got bookings");
			$scope.loadingDone = true;
			var slots = payload.data;
			$scope.slots = _.where(slots, {
				IsBooked: false
			});
			if ($scope.slots.length === 0) {
				$scope.noBookings = true;
			}
		});
		$scope.bookingDetails = {
			AppointmentID: '',
			Bookedby: ''
		};
		$scope.bookSlot = function (AppointmentID) {
			$scope.bookingDetails.AppointmentID = AppointmentID;
			$scope.bookingDetails.Bookedby = $scope.$parent.userId;
			$scope.bookPromise = DataService.postData('', '', '', 'booking', $scope.bookingDetails);
			$scope.bookPromise.then(function (payload) {
				$ionicHistory.goBack();
				console.log('Got Response: ' + payload.data);
			});
		};

	});
