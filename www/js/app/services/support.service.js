avivaApp.factory('supportService', function ($http, $q, $log) {
	return {
		raiseTicket: function (userId, service) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/terms';
			$http.post(url)
				.success(function (response) {
					deferred.resolve({
						claims: response
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