'use strict';
angular.module('main')
	.service('MapService', function ($log, $q, $state, SaveStuffService, $cordovaGeolocation, $http, lodash) {
		$log.log('Hello from your Service: MapService in module main');
		var posOptions = {
			timeout: 10000,
			enableHighAccuracy: false
		};

		return {
			getPosition: function () {

				ionic.Platform.ready(function () {
					// will execute when device is ready, or immediately if the device is already ready.
					console.log('ready');
				});

				var deferred = $q.defer();

				// navigator.geolocation.getCurrentPosition(onSuccess, onError);

				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						deferred.resolve({
							position: position
						});
					}, function (err) {
						deferred.reject(err);
						console.log(err);
					});

				// function onSuccess(position) {
				// 	deferred.resolve({
				// 		position: position
				// 	});
				// }
				//
				// function onError(error) {
				// 	console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
				// }
				return deferred.promise; //return location
			},
			createMap: function (position) {
				var deferred = $q.defer();

				var longitude = position.coords.longitude;
				var latitude = position.coords.latitude;
				var latLng = new google.maps.LatLng(latitude, longitude);
				// var latLng = new google.maps.LatLng(51.5287352, -0.3817831);
				var mapOptions = {
					zoom: 13
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
					radius: 10000,
					strokeColor: '#FF0000',
					strokeOpacity: 0.4,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.1
				});
				map.setCenter(latLng);
				map.setZoom(13);
				var deferred = $q.defer();
				var myBounds = circle.getBounds();
				deferred.resolve({
					bounds: myBounds,
					circle: circle
				});
				return deferred.promise;
			},
			drawAdvanceMarkers: function (map, coords, bounds, clinics) {
				console.log('draw markers started');
				var markers = [];
				var nearbyClinics = [];
				var i = 0;
				var deferred = $q.defer();
				var positions = [];
				var distances = [];
				console.log('clinics: ' + clinics.length);
				$.each(clinics, function (index, item) {
					var position = new google.maps.LatLng(item.Latitude, item.Longitude);
					markers[i] = new google.maps.Marker({
						position: position
					});
					if (bounds.contains(markers[i].getPosition())) {
						positions.push(position);
						nearbyClinics.push(item);
						markers[i].setMap(map);
						markers[i].addListener('click', function () {
							$state.go('main.clinicDetails');
							item.practiceId = item.PracticeId;
							SaveStuffService.setClinic(item);
						});
					}
					i++;
				});
				deferred.resolve({
					markers: markers
				});
				return deferred.promise;
			},
			drawMarkers: function (map, bounds, clinics) {
				var deferred = $q.defer();
				var markers = [];
				var nearbyClinics = [];
				var i = 0;
				var positions = [];
				console.log('Clinics for drawing markers: ' + clinics.length);
				var onSuccess = function (userLatLng) {
					$.each(clinics, function (index, item) {
						var position = new google.maps.LatLng(item.Latitude, item.Longitude);

						markers[i] = new google.maps.Marker({
							position: position
						});
						// var url = '#/dental-services/clinic-detail/' + item.practiceId;
						if (bounds.contains(markers[i].getPosition())) {
							positions.push(position);
							nearbyClinics.push(item);
							markers[i].setMap(map);
							markers[i].addListener('click', function () {
								$state.go('main.clinicDetails');
								SaveStuffService.setClinic(item);
							});
						}
						i++;
					});
					$.each(nearbyClinics, function (index, item) {
						if (!item.PracticeImageLoc) {
							item.imageToUse = 'main/assets/images/dental-practice-default.jpg';
						} else {
							item.imageToUse = item.PracticeImageLoc; //'https://dentalink.co.uk/' + 
						}
					});
					var userPosition = new google.maps.LatLng(userLatLng.coords.latitude, userLatLng.coords.longitude);
					deferred.resolve({
						nearbyClinics: nearbyClinics,
						markers: markers,
						userPosition: userPosition
					});
				};
				var onError = function () {

				};
				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						onSuccess(position);
					}, function (err) {
						onError(err);
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
			drawSearchMarker: function (map, markers, clinic) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(clinic.Latitude, clinic.Longitude)
				});
				map.setCenter(new google.maps.LatLng(clinic.Latitude, clinic.Longitude));
				map.setZoom(13);
				marker.setMap(map);
				marker.addListener('click', function () {
					$state.go('main.clinicDetails');
					SaveStuffService.setClinic(clinic);
				});
				markers.push(marker);
				return markers;
			},
			getDistance: function (destination) {
				var deferred = $q.defer();
				// navigator.geolocation.getCurrentPosition(onSuccess, onError);
				var onSuccess = function (position) {
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
						if (status === google.maps.DistanceMatrixStatus.OK) {
							// var origins = response.originAddresses;
							// var destinations = response.destinationAddresses;
							var value = response.rows[0].elements[0].distance.value;
							var distance = value / 1000;

							deferred.resolve({
								distance: distance
							});
						}

					});
				}

				var onError = function (error) {
					console.log('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
				}
				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						onSuccess(position);
					}, function (err) {
						deferred.reject(err);
						onError(err);
					});


				return deferred.promise;
			},
			getClinics: function (treatment) {
				var data = {
					treatment: treatment
				}
				console.log('get practices started');
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
				console.log('filter practices started');
				var deferred = $q.defer();
				var result;
				if (data.gender !== '') {
					result = _.filter(clinics, function (item) {
						if (item.DentistGender === data.gender) {
							return item;
						}
					});
				} else {
					result = clinics;
				}
				deferred.resolve({
					practices: result
				})
				return deferred.promise;
			},
			geocode: function (address) {
				console.log('geocode started');
				var deferred = $q.defer();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					'address': address
				}, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						deferred.resolve({
							coords: results[0].geometry.location
						});
					} else {
						deferred.reject(status);
						$log.error('Geocoding Unseccessful: ' + status);
					}
				});
				return deferred.promise;

			},
			centerMap: function (map, coords) {
				map.setCenter(coords);
			},
			centerMyPosition: function (map) {
				// navigator.geolocation.getCurrentPosition(onSuccess, onError);
				var onSuccess = function (position) {
					var longitude = position.coords.longitude;
					var latitude = position.coords.latitude;
					var latLng = new google.maps.LatLng(latitude, longitude);
					map.setCenter(latLng);
				}

				var onError = function () {

				}
				$cordovaGeolocation
					.getCurrentPosition(posOptions)
					.then(function (position) {
						onSuccess(position);
					}, function (err) {
						onError(err);
					});

			},
			calculateDistance: function (clinics, latLng) {
				console.log('Getting distances for ' + clinics.length + ' practices');
				var deferred = $q.defer();
				var positions = [];
				$.each(clinics, function (index, item) {
					var position = new google.maps.LatLng(item.Latitude, item.Longitude);
					positions.push(position);
				});
				var origin = latLng;
				var service = new google.maps.DistanceMatrixService();
				service.getDistanceMatrix({
					origins: [origin],
					destinations: positions,
					unitSystem: google.maps.UnitSystem.METRIC,
					travelMode: google.maps.TravelMode.DRIVING,
				}, function (response, status) {
					if (status === google.maps.DistanceMatrixStatus.OK) {
						var elements = response.rows[0].elements;
						var i = 0;
						$.each(elements, function (index, value) {
							var gotValue = Math.round(value.distance.value) / 1000;
							// distances.push(gotValue);
							clinics[i].distance = gotValue;
							i++;
						});
						deferred.resolve({
							data: clinics
						});
					} else {
						console.error('No practices found near your position. ' + status);
					}
				});
				return deferred.promise;
			}
		}
	});
