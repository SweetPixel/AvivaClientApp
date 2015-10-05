avivaApp.factory('myPolicyService', function ($http, $q) {
	return {
		getPolicy: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy?username=' + userId;
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						policy: response
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