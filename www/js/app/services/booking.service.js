avivaApp.factory('bookingService', function ($http, $q, $log) {
	return {
		getBooking: function () {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails';
			
			$http.get(url)
				.success(function (data) {
					deferred.resolve({
						slots: data
					})
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		bookSlot: function (bookingDetails) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails';
			
			$http.post(url, bookingDetails)
				.success(function (response) {
					deferred.resolve({
						status: response
					})
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		}
	}
})