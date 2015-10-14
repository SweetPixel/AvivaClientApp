avivaApp.factory('changePasswordService', function ($http, $q, $log) {
	return {
		changePassword: function (data) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Login/Change';
			
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