avivaApp.controller('bookingCtrl', function ($http, $scope, bookingService) {
	$scope.slots = {};
	$scope.loadingDone = false;
	console.log("getting bookings");
	$scope.promise = bookingService.getBooking();
	$scope.promise.then(function (payload) {
		$scope.loadingDone = true;
		console.log("Got bookings");
		var slots = payload.slots;
		$scope.slots = _.where(slots, {IsBooked: false});
		if ($scope.slots.length == 0) {
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
		$scope.bookPromise = bookingService.bookSlot($scope.bookingDetails);
		$scope.bookPromise.then(function (payload) {
			Materialize.toast('Slot booked.', 2000);
			$scope.$parent.back();
			console.log(payload.status);
		});
	};
})