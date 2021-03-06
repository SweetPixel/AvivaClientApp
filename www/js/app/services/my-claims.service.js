avivaApp.factory('myClaimsService', function ($http, $q, $log) {
	return {
		getClaims: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical?username=' + userId;
					break;
			}
			$http.get(url)
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
		},
		emailClaims: function (data, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/MyClaims';
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/MyClaims';
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/MyClaims';
					break;
			}
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