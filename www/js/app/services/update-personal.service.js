avivaApp.factory('updatePersonalService', function ($http, $q, $log) {
	return {
		updateDetails: function (user) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal';
			$http.post(url, user)
				.success(function (data) {
					deferred.resolve({
						data: data
					});
					Materialize.toast("Personal Details Updated.", 4000);
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		}
	}
})