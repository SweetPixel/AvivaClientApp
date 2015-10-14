avivaApp.factory('qrService', function ($http, $q, $log) {
	return {
		getQR: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/QRCode?username=' + userId;
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						qr: response
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