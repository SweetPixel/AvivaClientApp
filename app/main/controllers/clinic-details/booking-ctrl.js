'use strict';
angular.module('main')
	.controller('BookingCtrl', function ($log, $scope, DataService, $ionicLoading, $ionicHistory) {

		$log.log('Hello from your Controller: BookingCtrl in module main:. This is your controller:', this);
		$scope.promise = DataService.getData('', '', '', 'booking');
		$scope.promise.then(function (payload) {
			console.log('Got bookings');
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
			$scope.loadingDone = false;
			$scope.bookPromise.then(function (payload) {
				$scope.status = payload.data;
				console.log('Got Response: ' + $scope.status);
				if ($scope.status === true) {
					$ionicLoading.show({
						template: 'Slot booked. Thank you.',
						noBackdrop: true,
						duration: 2000
					});
					$scope.loadingDone = true;
					$ionicHistory.goBack();
				} else {
					$ionicLoading.show({
						template: 'Something went wrong. Please check your connection.',
						noBackdrop: true,
						duration: 3000
					});
					$scope.loadingDone = true;
				}
			});
		};

	});
