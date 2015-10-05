avivaApp.factory('familyDetailsService', function ($http, $q, $log) {
	var member = "";
	return {
		getDetails: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Family?username=' + userId;
			$log.log("Trying");
			$http.get(url)
				.success(function (data) {
					// $location.path('/settings');
					deferred.resolve({
						data: data
					});
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		setMember: function (familyMember) {
			member = familyMember;
		},
		getMember: function () {
			return member;
		},
		updateMember: function (familyMember, userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/FamilyEdit?username=' + userId;
			console.log('Saving member: ' + familyMember.FirstName);
			$http.post(url, familyMember)
				.success(function (data) {
					deferred.resolve({
						data: data
					});
					Materialize.toast("Family member updated.", 4000);
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		addMember: function (familyMember, userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Family?username=' + userId;
			console.log('Saving member: ' + familyMember.FirstName);
			$http.post(url, familyMember)
				.success(function (data) {
					deferred.resolve({
						data: data
					});
					Materialize.toast("Family member added.", 4000);
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		}
	}
})