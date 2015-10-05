avivaApp.factory('getPersonalService', function ($http, $q, $log) {
	return {
		getDetails: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal?username=' + userId;
			$log.log("Trying");
			$http.get(url)
				.success(function (data) {
					// $location.path('/settings');
					deferred.resolve({
						data: data
					});
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		}
	}
})