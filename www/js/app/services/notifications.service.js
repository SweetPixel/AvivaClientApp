avivaApp.factory('notificationsService', function ($http, $q) {
	return {
		getNotifications: function (userId, service) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Notification/List?username=' + userId;
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						notifications: response
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