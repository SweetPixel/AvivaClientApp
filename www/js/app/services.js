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
avivaApp.factory('mapService', function($q, $log){
	return {
		makeMap: {
			map: function (clinics) {
			    navigator.geolocation.getCurrentPosition(makeMap, this.onError);
				function makeMap (position) {
					var longitude = position.coords.longitude;
					var latitude = position.coords.latitude;
					var latLng = new google.maps.LatLng(latitude, longitude);
					var latLng1 = new google.maps.LatLng(53.3788635,-1.4703039);
					var mapOptions = {
					    center: latLng1,
					    zoom: 8
					};
					var map = new google.maps.Map(document.getElementById('map'), mapOptions);
					var markers = [];
					var i = 0;
					console.log(clinics.length);
					$.each(clinics, function (index, item) {
					    markers[i] = new google.maps.Marker({
					        position: new google.maps.LatLng(item.Latitude, item.Longitude),
					        url: 'details.html?id=' + item.practiceId
					    });
					    markers[i].setMap(map);
					    i++;
					});
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
					var myBounds = circle.getBounds();

					$.each(markers, function(index, item) {
						if (!myBounds.contains( item.getPosition() )) {
							item.setMap(null);
						}
					    item.addListener('click', function() {
					        window.location.href = item.url;
					    })
					});
				}
			},
			onError: function (error) {
			    alert('Code: ' + error.code + '\n' + 'message' + error.message + '\n');
			}
		}
	}
})