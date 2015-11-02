avivaApp.factory('clinicService', function ($http, $q, $log) {
	return {
		getClinic: function () {
			console.log("Dental clinic service Called");
			var deferred = $q.defer();
			$http.get('https://dentalink.co.uk/healthpickapi/api/Practice/GetPractice')
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
		},
		getMedical: function () {
			console.log("Medical clinic service Called");
			var deferred = $q.defer();
			$http.get('http://gplink.co.uk/api/GetTreatement')
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
		},
		getOptical: function () {
			console.log("Optical clinic service Called");
			var deferred = $q.defer();
			$http.get('https://dentalink.co.uk/healthpickapi/api/Practice/GetOpticalPractice/')
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