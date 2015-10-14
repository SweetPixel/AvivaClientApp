avivaApp.factory('treatmentService', function ($http, $q, $log) {
	return {
		getTreatments: function (practiceId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetTreatment?pracid=' + practiceId;
			
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