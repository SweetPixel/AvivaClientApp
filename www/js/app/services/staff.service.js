avivaApp.factory('staffService', function ($http, $q, $log) {
	return {
		getStaff: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Doctor';
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						staff: response
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