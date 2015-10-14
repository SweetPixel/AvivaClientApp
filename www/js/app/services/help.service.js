avivaApp.factory('helpService', function ($http, $q, $log) {
	return {
		getHelp: function (data) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/terms';
			$http.post(url, data)
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