avivaApp.factory('wellBeingService', function ($http, $q) {
	return {
		getArticles: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Medical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Optical?username=' + userId;
					break;
			}
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						articles: response
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