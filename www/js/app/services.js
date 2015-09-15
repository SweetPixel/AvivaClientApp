avivaApp.factory('clinicService', function ($http, $q, $log) {
	return {
		getClinic: function () {
			console.log("Service Called");
			var deferred = $q.defer();
			$http.get('http://healthpickapi.azurewebsites.net/api/practice')
				.success(function (data) {
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
			// var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
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
		getBounds: function (latLng1, map) {
			var circle = new google.maps.Circle({
			        center: latLng1,
			        map: map,
			        radius: 30000,
			        strokeColor: "#FF0000",
			        strokeOpacity: 0.4,
			        strokeWeight: 2,
			        fillColor: "#FF0000",
			        fillOpacity: 0.1
			});
			map.setCenter(latLng1);
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