avivaApp.factory('myClaimsService', function ($http, $q) {
	return {
		getClaims: function () {
			var deferred = $q.defer();
			var url = 'http://dentalink.co.uk/api/DentalService/GetClaimsList';
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						claims: response.claims
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