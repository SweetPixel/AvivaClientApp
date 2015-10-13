avivaApp.factory('settingsService', function ($http, $q, $log) {
	return {
		setNotifications: function (indicator, userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate';
			var data = {
				notific: '',
				username: userId
			};
			if (indicator == '1') {
				console.log("Was 1");
				data.notific = true;
			}
			else {
				console.log("Was 0");
				data.notific = false;
			}
			
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
		},
		getNotificationIndicator: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate?username=' + userId;
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						indicator: response
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