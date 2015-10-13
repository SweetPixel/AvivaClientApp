avivaApp.factory('adviceService', function ($http, $q, $log) {
	return {
		submitQuestion: function (question, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/Dental';
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/Medical';
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/Optical';
					break;
			}
			
			$http.post(url, question)
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
avivaApp.factory('changePasswordService', function ($http, $q) {
	return {
		changePassword: function (data) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Login/Change';
			
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
avivaApp.factory('clinicService', function ($http, $q, $log) {
	return {
		getClinic: function () {
			console.log("Service Called");
			var deferred = $q.defer();
			$http.get('https://dentalink.co.uk/healthpickapi/api/Practice')
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
avivaApp.factory('getPersonalService', function ($http, $q, $log) {
	return {
		getDetails: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/Personal?username=' + userId;
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
		}
	}
})
avivaApp.factory('loginService', function ($http, $q) {
	return {
		login: function (credentials) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Login/Login';
			
			$http.post(url, credentials)
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
avivaApp.factory('mapService', function ($q, $log, $location) {
	return {
		getPosition: function () {
			var deferred = $q.defer();
			
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			
			function onSuccess (position) {
				deferred.resolve({
					position: position
				});
			}
			function onError (error) {
			    alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise; //return location
		},
		createMap: function (position) {
			var deferred = $q.defer();
			
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var latLng = new google.maps.LatLng(latitude, longitude);
			/*var latLng = new google.maps.LatLng(53.3788635,-1.4703039);*/
			var mapOptions = {
			    zoom: 8
			};
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			deferred.resolve({
				map: map,
				latLng: latLng
			});

			return deferred.promise; //return map
		},
		getBounds: function (latLng, map) {
			var circle = new google.maps.Circle({
			        center: latLng,
			        map: map,
			        radius: 30000,
			        strokeColor: "#FF0000",
			        strokeOpacity: 0.4,
			        strokeWeight: 2,
			        fillColor: "#FF0000",
			        fillOpacity: 0.1
			});
			map.setCenter(latLng);
			map.setZoom(8);
			var deferred = $q.defer();
			var myBounds = circle.getBounds();
			deferred.resolve({
				bounds: myBounds,
				circle: circle
			});
			return deferred.promise;
		},
		drawMarkers: function (map, bounds, clinics) {
			var markers = [];
			var nearbyClinics = [];
			var i = 0;
			var deferred = $q.defer();
			var positions = [];
			var distances = [];
			$.each(clinics, function (index, item) {
				var position = new google.maps.LatLng(item.Latitude, item.Longitude);
				
			    markers[i] = new google.maps.Marker({
			        position: position
			    });
			    var url = '#/dental-services/clinic-detail/' + item.practiceId;
			    if (bounds.contains(markers[i].getPosition() )) {
			    	positions.push(position);
			    	nearbyClinics.push(item);
			    	markers[i].setMap(map);
			    	markers[i].addListener('click', function() {
			    	    console.log(url);
			    	    window.location.href = url;
			    	});
			    }
			    i++;
			});
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			
			function onSuccess (position) {
				var origin = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				var service = new google.maps.DistanceMatrixService();
				service.getDistanceMatrix({
					origins: [origin],
					destinations: positions,
					travelMode: google.maps.TravelMode.DRIVING,
					unitSystem: google.maps.UnitSystem.METRIC,
					avoidHighways: false,
					avoidTolls: false
				}, function (response, status) {
					if (status == google.maps.DistanceMatrixStatus.OK) {
						var origins = response.originAddresses;
						var destinations = response.destinationAddresses;
						var elements = response.rows[0].elements;
						
						for (var i = 0; i < elements.length; i++) {
							var distance = elements[i].distance.text;
							console.log(distance);
							distances.push(distance);
						}
						console.log(distances.length);
						for (var i = 0; i < nearbyClinics.length; i++) {
							nearbyClinics[i].distance = distances[i];
							console.log("practice " + i + ": " + distances[i]);
						}
						deferred.resolve({
							nearbyClinics: nearbyClinics,
							markers: markers
						});
						
					}
					else if (status == google.maps.DistanceMatrixStatus.NOT_FOUND) {
						console.log("Not found");
					}
					else if (status == google.maps.DistanceMatrixStatus.ZERO_RESULTS) {
						console.log("ZERO found");
					}
					else {
						console.log("Nothing");
						deferred.resolve({
							nearbyClinics: nearbyClinics,
							markers: markers
						});
					}
				});
			}
			function onError (error) {
			    alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			
			return deferred.promise;
		},
		removeDrawings: function (markers, circle) {
			if (markers) {
				$.each(markers, function (index, item) {
					item.setMap(null);
				});
			}
			if (circle) {
				circle.setMap(null);
			}
		},
		drawSearchMarker: function (map, markers, clinic) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(clinic.Latitude, clinic.Longitude)
			});
			var url = '#/dental-services/clinic-detail/' + clinic.practiceId;
			map.setCenter(new google.maps.LatLng(clinic.Latitude, clinic.Longitude));
			map.setZoom(10);
			marker.setMap(map);
			marker.addListener('click', function() {
			    	    console.log(url);
			    	    window.location.href = url;
			    	});
			markers.push(marker);
			return markers;
		},
		getDistance: function (destination) {
			var deferred = $q.defer();
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			function onSuccess (position) {
				var longitude = position.coords.longitude;
				var latitude = position.coords.latitude;
				var origin = new google.maps.LatLng(latitude, longitude);
				var service = new google.maps.DistanceMatrixService();
				service.getDistanceMatrix({
					origins: [origin],
					destinations: [destination],
					travelMode: google.maps.TravelMode.DRIVING,
					unitSystem: google.maps.UnitSystem.METRIC,
					avoidHighways: false,
					avoidTolls: false
				}, function (response, status) {
					if (status == google.maps.DistanceMatrixStatus.OK) {
						var origins = response.originAddresses;
						var destinations = response.destinationAddresses;

						var distance = response.rows[0].elements[0].distance.text;

						deferred.resolve({
							distance: distance
						});
						console.log(distance);
					}

				});
			}
			function onError (error) {
			    alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise;
		}
	}
});
avivaApp.factory('myClaimsService', function ($http, $q) {
	return {
		getClaims: function (userId, service) {
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
						claims: response
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
avivaApp.factory('myPolicyService', function ($http, $q) {
	return {
		getPolicy: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Optical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/MyPolicy/Medical?username=' + userId;
					break;
			}
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						policy: response
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
avivaApp.factory('qrService', function ($http, $q) {
	return {
		getQR: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Profile/QRCode?username=' + userId;
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						qr: response
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
avivaApp.factory('staffService', function ($http, $q) {
	return {
		getStaff: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Doctor?username=' + userId;
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						staff: response
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
avivaApp.factory('termsService', function ($q, $http) {
	return {
		getTerms: function () {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Terms';
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						terms: response
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
avivaApp.factory('treatmentService', function ($http, $q) {
	return {
		getTreatments: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/Medical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/optical?username=' + userId;
					break;
			}
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						treatments: response
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
avivaApp.factory('wellBeingService', function ($http, $q, $log) {
	return {
		getArticles: function (userId, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/dental?username=' + userId;
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Medical?username=' + userId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Wellbeing/Optical?username=' + userId;
					break;
			}
			
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						articles: response
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