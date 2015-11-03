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
			    alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
			return deferred.promise;
		}
	}
})