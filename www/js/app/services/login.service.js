avivaApp.factory('loginService', function ($http, $q) {
	return {
		login: function (credentials) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Login/Login';
			
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