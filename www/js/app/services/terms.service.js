avivaApp.factory('termsService', function ($q, $http, $log) {
	return {
		getTerms: function () {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Terms';
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						terms: response
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