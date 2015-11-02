avivaApp.factory('treatmentService', function ($http, $q, $log) {
	return {
		getTreatments: function (practiceId, service) {
			var deferred = $q.defer();
			var url;
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetTreatment?pracid=' + practiceId;
					break;
				case 2:
					url = 'http://gplink.co.uk/api/GetTreatement?pracId=' + practiceId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetOpticalTreatment?pracid=' + practiceId;
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