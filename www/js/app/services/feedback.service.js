avivaApp.factory('feedbackService', function ($http, $q, $log) {
	return {
		getFeedbacks: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
				url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental?username=' + userId;
				break;
				case 2:
				url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical?username=' + userId;
				break;
				case 3:
				url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical?username=' + userId;
				break;
			}
			$http.get(url)
			.success(function (response) {
				deferred.resolve({
					feedback: response
				})
			})
			.error(function (msg, code) {
				deferred.reject(msg);
				$log.error(msg, code);
			});
			return deferred.promise;
		},
		postFeedback: function (feedback, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
				url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/Feedback';
				break;
				case 2:
				url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Feedback';
				break;
				case 3:
				url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Feedback';
				break;
			}
			console.log(feedback);
			$http.post(url, feedback)
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