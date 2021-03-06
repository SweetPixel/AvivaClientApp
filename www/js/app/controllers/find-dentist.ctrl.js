avivaApp.controller('findDentistCtrl', function($scope, $http, mapService, $log, $location){
	$scope.clinics = [];
	$scope.sortBy = '+distance';
	$scope.countMessage = "Searching for practices";
	$scope.loadingDone = false;
	$scope.loadNearbyDone = false;
	$scope.advancedSearch = false;
	var setNearbyClinics;

	switch ($scope.$parent.service) {
		case 1:
			console.log("case: "+1)
			$scope.$parent.promise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
		case 2:
			console.log("case: "+2)
			$scope.$parent.medicalPromise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
		case 3:
			console.log("case: "+3)
			$scope.$parent.opticalPromise.then(function (payload) {
				$scope.allClinics = payload.data
				beginMapping();
			},
			function (errorPayload) {
				alert("Failed to get information of clinics. Please check your connection and try again.");
				$log.error("Failure getting clinics info", errorPayload);
			});
			break;
	}

	beginMapping = function () {
		$scope.getPositionPromise = mapService.getPosition();
		$scope.getPositionPromise.then(function (positionPayload) {
			$scope.position = positionPayload.position;

			$scope.createMapPromise = mapService.createMap($scope.position);
			$scope.createMapPromise.then(function (mapPayload) {
				$scope.loadingDone = true;
				$scope.map = mapPayload.map;
				$scope.latLng = mapPayload.latLng;
				setNearbyClinics = function () {
					$scope.getBoundsPromise = mapService.getBounds($scope.latLng, $scope.map);
					$scope.getBoundsPromise.then(function (boundsPayload) {
						$scope.bounds = boundsPayload.bounds;
						$scope.circle = boundsPayload.circle;
						$scope.drawMarkersPromise = mapService.drawMarkers($scope.map, $scope.bounds, $scope.allClinics);
						$scope.drawMarkersPromise.then(function (markersPayload) {
							$scope.loadNearbyDone = true;
							$scope.clinics = markersPayload.nearbyClinics;
							$scope.markers = markersPayload.markers;
							$scope.distances = markersPayload.distances;
							var clinicsCount = $scope.clinics.length;
							if (clinicsCount > 0) {
								$scope.countMessage = "The following " + clinicsCount + " practices were found within 30 kms of your location.";
							}
							else {
								$scope.countMessage = "No practices were found within 30 kms of your location";
							}
						});
					});
				};
				setNearbyClinics();
			});
		});
	}
	
	$scope.searchResult = [];
	$scope.$watch('value', function (changed) {
		if (changed) {
			$scope.searchResult = [];
			switch ($scope.$parent.service) {
				case 1:
					$scope.$parent.promise.then(function (payload) {
						$.each($scope.$parent.clinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
				case 2:
					$scope.$parent.medicalPromise.then(function (payload) {
						$.each($scope.$parent.medicalClinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
				case 3:
					$scope.$parent.opticalPromise.then(function (payload) {
						$.each($scope.$parent.opticalClinics, function (index, item) {
							if (item.Postcode.toLowerCase().indexOf(changed.toLowerCase()) > -1) {
								$scope.gotSearchResult = true;
								if ($scope.searchResult.length < 5) {
									$scope.searchResult.push(item);
								}
							}
						});
					});
					break;
			}
		}
		else {
			$scope.gotSearchResult = false;
		}
	});
	$scope.drawSearchMarker = function (clinic) {
		console.log(clinic.Postcode);
		$scope.gotSearchResult = false;
		$scope.value = clinic.Postcode + ' ' + clinic.PracticeName;
		$scope.createMapPromise.then(function () {
			$scope.drawMarkersPromise.then(function () {
				mapService.removeDrawings($scope.markers, $scope.circle);
				$scope.markers = mapService.drawSearchMarker($scope.map, $scope.markers, clinic);
			});
		});
	};
	$scope.resetPosition = function () {
		$scope.createMapPromise.then(function () {
			$scope.drawMarkersPromise.then(function () {
				mapService.removeDrawings($scope.markers, $scope.circle);
				setNearbyClinics();
			});
		});
	}
});