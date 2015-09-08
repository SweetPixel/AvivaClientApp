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
			var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
			var mapOptions = {
			    zoom: 8
			};
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			deferred.resolve({
				map: map,
				latLng: latLng1
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
			$.each(clinics, function (index, item) {
			    markers[i] = new google.maps.Marker({
			        position: new google.maps.LatLng(item.Latitude, item.Longitude),
			    });
			    var url = '#/dental-services/clinic-detail/' + item.practiceId;
			    if (bounds.contains(markers[i].getPosition() )) {
			    	nearbyClinics.push(item);
			    	markers[i].setMap(map);
			    	markers[i].addListener('click', function() {
			    	    console.log(url);
			    	    window.location.href = url;
			    	});
			    }
			    i++;
			});
			
			deferred.resolve({
				nearbyClinics: nearbyClinics,
				markers: markers
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
			map.setZoom(10);
			marker.setMap(map);
			markers.push(marker);
			return markers;
		}
	}
});