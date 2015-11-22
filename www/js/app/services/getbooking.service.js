avivaApp.factory('getbookingService', function ($http, $q, $log) {
	return {
		getbooking: function (credentials) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails';
			
			$http.post(url, credentials)
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