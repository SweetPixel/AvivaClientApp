'use strict';
angular.module('main')
	.service('DataService', function ($log, $q, $http) {

		$log.log('Hello from your Service: DataService in module main');
		var getUrls = [{
			name: 'practice',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/Practice/GetPractice',
					medical: 'https://dentalink.co.uk/HealthpickApi/api/medicalpractice',
					optical: 'https://dentalink.co.uk/healthpickapi/api/Practice/GetOpticalPractice'
				}
			}
		}, {
			name: 'allTreatments',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetDentalTreatmentlist',
					medical: 'http://gplink.co.uk/api/GetTreatement',
					optical: 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetOpticalTreatmentlist'
				}
			}
		}, {
			name: 'booking',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails'
			}
		}, {
			name: 'familyDetails',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/Family?username='
			}
		}, {
			name: 'personalDetails',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal?username='
			}
		}, {
			name: 'claims',
			data: {
				userId: true,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental?username=',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical?username=',
					optical: 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical?username='
				}
			}
		}, {
			name: 'policy',
			data: {
				userId: true,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Dental?username=',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Optical?username=',
					optical: 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Medical?username='
				}
			}
		}, {
			name: 'notifications',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Notification/List?username='
			}
		}, {
			name: 'qr',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/QRCode?username='
			}
		}, {
			name: 'checkIfNotificationsOn',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate?username='
			}
		}, {
			name: 'staff',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Doctor'
			}
		}, {
			name: 'terms',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Terms'
			}
		}, {
			name: 'timing',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/Practice/GetPractice/',
					medical: 'https://dentalink.co.uk/HealthpickApi/api/medicalpractice',
					optical: 'https://dentalink.co.uk/healthpickapi/api/Practice/GetOpticalPractice/'
				}
			}
		}, {
			name: 'treatments',
			data: {
				userId: false,
				serviceId: true,
				practiceId: true,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetTreatment?pracid=',
					medical: 'http://gplink.co.uk/api/GetTreatement?pracId=',
					optical: 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetOpticalTreatment?pracid='
				}
			}
		}, {
			name: 'wellbeing',
			data: {
				userId: true,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/dental?username=',
					medical: 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Medical?username=',
					optical: 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Optical?username='
				}
			}
		}];
		var postUrls = [{
			name: 'advanceSearch',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Practice/AdvanceSearch'
			}
		}, {
			name: 'advice',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical',
					optical: 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical'
				}
			}
		}, {
			name: 'booking',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails'
			}
		}, {
			name: 'changePassword',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Login/Change'
			}
		}, {
			name: 'updateFamilyMember',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/FamilyEdit?username='
			}
		}, {
			name: 'addFamilyMember',
			data: {
				userId: true,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/Family?username='
			}
		}, {
			name: 'getFeedback',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/DentalService/GetFeedback',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MedicalService/GetFeedback',
					optical: 'https://dentalink.co.uk/healthpickapi/api/OpticalService/GetFeedback'
				}
			}
		}, {
			name: 'postFeedback',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/DentalService/Feedback',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Feedback',
					optical: 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Feedback'
				}
			}
		}, {
			name: 'support',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/terms'
			}
		}, {
			name: 'login',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Login/Login'
			}
		}, {
			name: 'claims',
			data: {
				userId: false,
				serviceId: true,
				practiceId: false,
				url: {
					dental: 'https://dentalink.co.uk/healthpickapi/api/DentalService/MyClaims',
					medical: 'https://dentalink.co.uk/healthpickapi/api/MedicalService/MyClaims',
					optical: 'https://dentalink.co.uk/healthpickapi/api/OpticalService/MyClaims'
				}
			}
		}, {
			name: 'makeNotificationSeen',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate'
			}
		}, {
			name: 'toggleNotifications',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Notification/indicate'
			}
		}, {
			name: 'support',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/terms'
			}
		}, {
			name: 'updatePersonalDetails',
			data: {
				userId: false,
				serviceId: false,
				practiceId: false,
				url: 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal'
			}
		}];


		return {
			getData: function (userId, serviceId, practiceId, required) {
				var url;
				var deferred = $q.defer();
				var requiredData = '';
				for (var i = 0; i < getUrls.length; i++) {
					if (getUrls[i].name === required) {
						console.log(required + ' found in getUrls.');
						requiredData = getUrls[i].data;
						break;
					}
				}
				if (requiredData.serviceId === true) {
					if (serviceId === 'Dental') {
						url = requiredData.url.dental;
					} else if (serviceId === 'Medical') {
						url = requiredData.url.medical;
					} else if (serviceId === 'Optical') {
						url = requiredData.url.optical;
					}

					if (requiredData.userId === true) {
						url += userId;
					}

					if (requiredData.practiceId === true) {
						url += practiceId;
					}
				} else {
					url = requiredData.url;
					if (requiredData.userId === true) {
						url += userId;
					}
					if (requiredData.practiceId === true) {
						url += practiceId;
					}
				}
				console.log('Parsed URL as: ' + url);

				$http.get(url)
					.success(function (data) {
						deferred.resolve({
							data: data
						});
						console.log(required + ' received through GET.');
					})
					.error(function (msg, code) {
						deferred.reject(msg);
						$log.error(msg, code);
					});
				return deferred.promise;
			},
			postData: function (userId, serviceId, practiceId, required, data) {
				var url;
				var deferred = $q.defer();
				var requiredData = '';
				for (var i = 0; i < postUrls.length; i++) {
					if (postUrls[i].name === required) {
						console.log(required + ' found in postUrls.');
						requiredData = postUrls[i].data;
						break;
					}
				}
				if (requiredData.serviceId === true) {
					if (serviceId === 'Dental') {
						url = requiredData.url.dental;
					} else if (serviceId === 'Medical') {
						url = requiredData.url.medical;
					} else if (serviceId === 'Optical') {
						url = requiredData.url.optical;
					}

					if (requiredData.userId === true) {
						url += userId;
					}

					if (requiredData.practiceId === true) {
						url += practiceId;
					}
				} else {
					url = requiredData.url;
					if (requiredData.userId === true) {
						url += userId;
					}
					if (requiredData.practiceId === true) {
						url += practiceId;
					}
				}
				console.log('Parsed URL as: ' + url);

				$http.post(url, data)
					.success(function (data) {
						deferred.resolve({
							data: data
						});
						console.log(required + ' received through POST.');
					})
					.error(function (msg, code) {
						deferred.reject(msg);
						$log.error(msg, code);
					});
				return deferred.promise;
			}
		}

	});
