avivaApp.factory('treatmentService', function ($http, $q) {
	return {
		getTreatments: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/Medical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/optical?username=' + userId;
					break;
			}
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						treatments: response
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