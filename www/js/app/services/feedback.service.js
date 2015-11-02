avivaApp.factory('feedbackService', function ($http, $q, $log) {
	return {
		getFeedbacks: function (userId, practiceId, service) {
			var deferred = $q.defer();
			var data = {
				username: userId,
				practiceid: practiceId
			}
			var url = '';
			switch (service) {
				case 1:
				url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/GetFeedback';
				break;
				case 2:
				url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/GetFeedback';
				break;
				case 3:
				url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/GetFeedback';
				break;
			}
			$http.post(url, data)
				.success(function (response) {
					deferred.resolve({
						feedbacks: response
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