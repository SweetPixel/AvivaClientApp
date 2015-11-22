avivaApp.factory('advanceSearchService', function ($q, $log, $http) {
	return {
		getTreatments: function (service) {
			console.log("Get Treatments Called");
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetDentalTreatmentlist';
					break;
				case 2:
					url = 'http://gplink.co.uk/api/GetTreatement';
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetOpticalTreatmentlist';
					break;
			}
			$http.get(url)
				.success(function (response) {
					console.log("passed");
					deferred.resolve({
						treatments: response
					})
				})
				.error(function (msg, code) {
					console.log("failed");
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		getClinics: function (treatment) {
			var data = {
				treatment: treatment
			}
			console.log("get practices started");
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Practice/AdvanceSearch';
			$http.post(url, data)
				.success(function (data) {
					deferred.resolve({
						clinics: data
					});
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		filterPractices: function (data, clinics) {
			console.log("filter practices started");
			var deferred = $q.defer();
			var result;
			if (data.gender !== '') {
				result = _.filter(clinics, function (item) {
					if (item.DentistGender == data.gender) {
						return item;
					}
				});
			}
			else {
				result = clinics;
			}
			deferred.resolve({
				practices: result
			})
			return deferred.promise;
		},
		createMap: function () {
			console.log("Create map started");
			var deferred = $q.defer();
			
			/*var coords = new google.maps.LatLng(53.3788635,-1.4703039);*/
			var mapOptions = {
			    zoom: 8
			};
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			deferred.resolve({
				map: map
			});

			return deferred.promise; //return map
		},
		geocode: function (address) {
			console.log("geocode started");
			var deferred = $q.defer();
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': address}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					deferred.resolve({
						coords: results[0].geometry.location
					});
				}
				else {
					deferred.reject(status);
					$log.error("Geocoding Unseccessful: " + status);
				}
			});
			return deferred.promise;

		},
		centerMap: function (map, coords) {
			map.setCenter(coords);
		},
		centerMyPosition: function (map) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			
			function onSuccess (position) {
				var longitude = position.coords.longitude;
				var latitude = position.coords.latitude;
				var latLng = new google.maps.LatLng(latitude, longitude);
				map.setCenter(latLng);
			}
			function onError () {
				
			}
		},
		getBounds: function (map, coords) {
			console.log("get bounds started");
			var circle = new google.maps.Circle({
			        center: coords,
			        map: map,
			        radius: 30000,
			        strokeColor: "#FF0000",
			        strokeOpacity: 0.4,
			        strokeWeight: 2,
			        fillColor: "#FF0000",
			        fillOpacity: 0.1
			});
			var deferred = $q.defer();
			var myBounds = circle.getBounds();
			deferred.resolve({
				bounds: myBounds,
				circle: circle
			});
			return deferred.promise;
		},
		drawMarkers: function (map, coords, bounds, clinics) {
			console.log("draw markers started");
			var markers = [];
			var nearbyClinics = [];
			var i = 0;
			var deferred = $q.defer();
			var positions = [];
			var distances = [];
			console.log("clinics: " + clinics.length);
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
			var service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix({
				origins: [coords],
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
			    console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise;
		}
	}
})
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
avivaApp.factory('bookingService', function ($http, $q, $log) {
	return {
		getBooking: function () {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails';
			
			$http.get(url)
				.success(function (data) {
					deferred.resolve({
						slots: data
					})
				})
				.error(function (msg, code) {
					deferred.reject(msg);
					$log.error(msg, code);
				});
			return deferred.promise;
		},
		bookSlot: function (bookingDetails) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/HealthpickApi/api/AppointmentDetails';
			
			$http.post(url, bookingDetails)
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
avivaApp.factory('changePasswordService', function ($http, $q, $log) {
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
			$http.get('https://dentalink.co.uk/HealthpickApi/api/medicalpractice')
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
avivaApp.factory('helpService', function ($http, $q, $log) {
	return {
		getHelp: function (data) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/terms';
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
avivaApp.factory('loginService', function ($http, $q, $log) {
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
			    console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise; //return location
		},
		createMap: function (position) {
			var deferred = $q.defer();
			
			var longitude = position.coords.longitude;
			var latitude = position.coords.latitude;
			var latLng = new google.maps.LatLng(latitude, longitude);
			// var latLng = new google.maps.LatLng(53.3788635,-1.4703039);
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
			    console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
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
			    console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise;
		}
	}
});
avivaApp.factory('myClaimsService', function ($http, $q, $log) {
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
		},
		emailClaims: function (data, service) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/DentalService/MyClaims';
					break;
				case 2:
					url = 'https://dentalink.co.uk/healthpickapi/api/MedicalService/MyClaims';
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/OpticalService/MyClaims';
					break;
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
		}
	}
})
avivaApp.factory('myPolicyService', function ($http, $q, $log) {
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
avivaApp.factory('qrService', function ($http, $q, $log) {
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
avivaApp.factory('staffService', function ($http, $q, $log) {
	return {
		getStaff: function (userId) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/Doctor';
			
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
avivaApp.factory('supportService', function ($http, $q, $log) {
	return {
		raiseTicket: function (userId, service) {
			var deferred = $q.defer();
			var url = 'https://dentalink.co.uk/healthpickapi/api/terms';
			$http.post(url)
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
avivaApp.factory('termsService', function ($q, $http, $log) {
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
avivaApp.factory('timingService', function ($http, $q, $log) {
	return {
		getTiming: function (service, practiceId) {
			var deferred = $q.defer();
			var url = '';
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Practice/GetPractice/' + practiceId;
					break;
				case 2:
					url = 'http://gplink.co.uk/api/getpractice/' + practiceId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Practice/GetOpticalPractice/' + practiceId;
					break;
			}
			$http.get(url)
				.success(function (response) {
					deferred.resolve({
						practice: response
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
avivaApp.factory('treatmentService', function ($http, $q, $log) {
	return {
		getTreatments: function (practiceId, service) {
			var deferred = $q.defer();
			var url;
			switch (service) {
				case 1:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetTreatment?pracid=' + practiceId;
					break;
				case 2:
					url = 'http://gplink.co.uk/api/GetTreatement?pracId=' + practiceId;
					break;
				case 3:
					url = 'https://dentalink.co.uk/healthpickapi/api/Treatment/GetOpticalTreatment?pracid=' + practiceId;
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