avivaApp.factory('timingService', function ($http, $q, $log) {
	return {
		getTiming: function (service, practiceId) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Practice/GetPractice/' + practiceId;
					break;
				case 2:
					url = 'http://gplink.co.uk/api/getpractice/' + practiceId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Practice/GetOpticalPractice/' + practiceId;
					break;
			}
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						practice: response
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