avivaApp.factory('clinicService', function ($http, $q, $log) {
	return {
		getClinic: function () {
			console.log("Service Called");
			var deferred = $q.defer();
			$http.get('https://dentalink.co.uk/healthpickapi/api/Practice')
				.success(function (data) {
					console.log(data.length);
					deferred.resolve({
						data: data
					})
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		}
	}
});