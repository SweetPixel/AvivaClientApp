avivaApp.factory('wellBeingService', function ($http, $q) {
	return {
		getArticles: function (service) {
			var deferred = $q.defer();
			var serviceNumber = '';
			switch (service) {
				case 1:
					serviceNumber = 'first';
					break;
				case 2:
					serviceNumber = 'second';
					break;
				case 3:
					serviceNumber = 'third';
					break;
			}
			url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing?service=' + serviceNumber;
			
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