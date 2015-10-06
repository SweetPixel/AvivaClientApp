avivaApp.factory('myPolicyService', function ($http, $q) {
	return {
		getPolicy: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Optical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Medical?username=' + userId;
					break;
			}
			
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