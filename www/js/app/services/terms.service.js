avivaApp.factory('termsService', function ($q, $http) {
	return {
		getTerms: function () {
			var deferred = $q.defer();
			var url = 'http://dentalink.co.uk/api/Terms/TermsandCondtion';
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