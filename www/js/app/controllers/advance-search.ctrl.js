avivaApp.controller('advanceSearchCtrl', function($scope, $log, advanceSearchService) {
    $scope.data = {
        location: '',
        gender: '',
        treatment: ''
    }
    $scope.createMapPromise = advanceSearchService.createMap();
    $scope.getTreatmentsPromise = advanceSearchService.getTreatments();
    $scope.getTreatmentsPromise.then(function (payload) {
    	$scope.treatments = payload.treatments;
    })

    $scope.search = function() {
    	if ($scope.data.location == '') {
    		alert("Please provide a location.");
    	}
    	else {
    		advanceSearchService.removeDrawings($scope.markers, $scope.circle);
	    	console.log("for treatment: " + $scope.data.treatment);
	    	$scope.getClinicsPromise = advanceSearchService.getClinics($scope.data.treatment);
	    	$scope.getClinicsPromise.then(function (payload) {
	            $scope.allPractices = payload.clinics;
	            console.log("Got practices for treatment: " + $scope.data.treatment + " - " + $scope.allPractices.length);
	            $scope.createMapPromise.then(function(payload) {
	                $scope.map = payload.map;
                    $scope.filterPracticesPromise = advanceSearchService.filterPractices($scope.data, $scope.allPractices);
                    $scope.filterPracticesPromise.then(function(payload) {
                        $scope.practices = payload.practices;
                        $scope.geocodePromise = advanceSearchService.geocode($scope.data.location);
                        $scope.geocodePromise.then(function(payload) {
                            $scope.coords = payload.coords;

                            advanceSearchService.centerMap($scope.map, $scope.coords);

                            $scope.getBoundsPromise = advanceSearchService.getBounds($scope.map, $scope.coords);
                            $scope.getBoundsPromise.then(function(payload) {
                                $scope.bounds = payload.bounds;
                                $scope.circle = payload.circle;
                                $scope.drawMarkersPromise = advanceSearchService.drawMarkers($scope.map, $scope.coords, $scope.bounds, $scope.practices);
                                $scope.drawMarkersPromise.then(function(payload) {
                                    $scope.nearbyClinics = payload.nearbyClinics;
                                    $scope.markers = payload.markers;
                                    $scope.distances = payload.distances;
                                    var clinicsCount = $scope.clinics.length;
                                    if (clinicsCount > 0) {
                                        $scope.countMessage = "The following " + clinicsCount + " practices were found within 30 kms of your location.";
                                    } else {
                                        $scope.countMessage = "No practices were found within 30 kms of your location";
                                    }
                                });
                            });
                        });
                    });
	            });
	    		
	    	});
    	}
                
    };
    /*$scope.drawSearchMarker = function(clinic) {
        console.log(clinic.Postcode);
        $scope.gotSearchResult = false;
        $scope.value = clinic.Postcode + ' ' + clinic.PracticeName;
        $scope.createMapPromise.then(function() {
            $scope.drawMarkersPromise.then(function() {
                advanceSearchService.removeDrawings($scope.markers, $scope.circle);
                $scope.markers = advanceSearchService.drawSearchMarker($scope.map, $scope.markers, clinic);
            });
        });
    };
    $scope.resetPosition = function() {
        $scope.createMapPromise.then(function() {
            $scope.drawMarkersPromise.then(function() {
                advanceSearchService.removeDrawings($scope.markers, $scope.circle);
                setNearbyClinics();
            });
        });
    }*/
});
