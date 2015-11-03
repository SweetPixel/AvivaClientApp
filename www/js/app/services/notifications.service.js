avivaApp.factory('notificationsService', function ($http, $q, $log) {
	return {
		getNotifications: function (userId) {
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
		},
		makeSeen: function (data) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate';
			$http.post(url, data)
				.success(function (response) {
					deferred.resolve({
						status: response
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