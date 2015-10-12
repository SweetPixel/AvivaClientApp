avivaApp.factory('settingsService', function ($http, $q, $log) {
	return {
		setNotifications: function (indicator, userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate';
			var set;
			if (indicator == '1') {
				console.log("Was 1");
				set = true;
			}
			else {
				console.log("Was 0");
				set = false;
			}
			
			$http.post(url, set)
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