avivaApp.factory('adviceService', function ($http, $q, $log) {
	return {
		submitQuestion: function (question, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental';
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical';
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical';
					break;
			}
			
			$http.post(url, question)
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